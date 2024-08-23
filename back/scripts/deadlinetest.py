import pymongo
from pymongo import MongoClient

# MongoDB 연결 설정
client = MongoClient('mongodb+srv://nanolaebmeta:skshfoqapxk2024!@cluster0.vydwyas.mongodb.net/nanolabmeta?retryWrites=true&w=majority&appName=Cluster0')
db = client['nanolabmeta']

# 모든 컬렉션 이름 가져오기
collection_names = db.list_collection_names()

for collection_name in collection_names:
    collection = db[collection_name]

    # 기준이 되는 필드들 (예: title, date, link)
    pipeline = [
        {
            "$group": {
                "_id": {
                    "title": "$title",  # title과 date 기준으로 그룹화
                    "date": "$date"
                },
                "count": {"$sum": 1},
                "docs": {"$push": "$$ROOT"}
            }
        },
        {
            "$match": {
                "count": {"$gt": 1}  # 중복된 문서만 선택
            }
        }
    ]

    duplicates = collection.aggregate(pipeline)

    any_duplicates_found = False  # 중복이 발견되었는지 추적

    for duplicate in duplicates:
        any_duplicates_found = True
        print(f"Found duplicate documents in collection '{collection_name}':")
        for doc in duplicate['docs']:
            print(f"Document ID: {doc['_id']}, Title: {doc['title']}, Date: {doc['date']}, Link: {doc.get('link', 'N/A')}")

        # 첫 번째 문서를 남겨두고 나머지 중복 문서를 제거
        ids_to_remove = [doc['_id'] for doc in duplicate['docs'][1:]]  # 첫 번째 문서 제외

        # 중복 문서 삭제
        result = collection.delete_many({"_id": {"$in": ids_to_remove}})
        print(f"Removed {result.deleted_count} duplicates from collection '{collection_name}'.\n")

    if not any_duplicates_found:
        print(f"No duplicates found in collection '{collection_name}'.\n")

print("Finished removing duplicates from all collections.")