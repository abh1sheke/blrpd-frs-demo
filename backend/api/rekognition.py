import boto3
import io
from PIL import Image


class FaceRecognition:
    def __init__(self, filename, imagePath, detectBucket, searchBucket, tableName, destination_folder) -> None:
        self.filename = filename
        self.imagePath = imagePath
        self.image = Image.open(imagePath)
        self.image = self.image.convert('RGB')
        self.detectBucket = detectBucket
        self.searchBucket = searchBucket
        self.tableName = tableName
        self.destination_folder = destination_folder

    def detectFaces(self):
        s3 = boto3.resource('s3')
        file = open(self.imagePath, 'rb')
        object = s3.Object(self.detectBucket, self.filename)
        ret = object.put(Body=file, Metadata={'filename': self.filename})
        rekognition = boto3.client(
            'rekognition', region_name='ap-south-1')
        response = rekognition.detect_faces(
            Image={
                "S3Object": {
                    "Bucket": self.detectBucket,
                    "Name": self.filename,
                }
            },
        )
        width, height = self.image.size
        images = []
        for face in response['FaceDetails']:
            if face['Confidence'] > 90:
                box = face['BoundingBox']
                left = round(box['Left'] * width, 3)
                right = round((box['Left'] + box['Width']) * width, 3)
                top = round(box['Top'] * height, 3)
                bottom = round((box['Top'] + box['Height']) * height, 3)
                cropped_image = self.image.crop((left, top, right, bottom))
                images.append(cropped_image)
        return images

    def findMatches(self, face, key):
        stream = io.BytesIO()
        face.save(stream, format='JPEG')
        imageBinary = stream.getvalue()

        dynamodb = boto3.client('dynamodb', region_name='ap-south-1')
        rekognition = boto3.client(
            'rekognition', region_name='ap-south-1')
        response = rekognition.search_faces_by_image(
            CollectionId=self.searchBucket,
            Image={
                'Bytes': imageBinary
            }
        )

        for match in response['FaceMatches']:
            face_key = dynamodb.get_item(
                TableName=self.tableName,
                Key={
                    'RekognitionId': {'S': match['Face']['FaceId']}
                }
            )
            if 'Item' in face_key:
                face.save(f'{self.destination_folder}/images/{key}{self.filename}', format='JPEG')
                return {'Match': match, 'FaceId': face_key, 'MatchFile': f'{key}{self.filename}'}
        return None
