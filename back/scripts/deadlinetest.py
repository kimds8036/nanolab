import pymongo

# MongoDB 연결 설정
client = pymongo.MongoClient('mongodb+srv://nanolaebmeta:skshfoqapxk2024!@cluster0.vydwyas.mongodb.net/nanolabmeta?retryWrites=true&w=majority&appName=Cluster0')
db = client['nanolabmeta']

def deduplicate_urls_in_notices_collections():
    # 'notices'로 시작하는 모든 컬렉션 이름 가져오기
    collections = [col for col in db.list_collection_names() if col.startswith('notices')]

    for collection_name in collections:
        print(f"Processing collection: {collection_name}")
        collection = db[collection_name]
        # 모든 문서를 탐색
        for document in collection.find():
            updated_fields = {}
            is_updated = False
            document_id = document['_id']  # _id 가져오기

            # files 필드 중복 제거
            if 'files' in document:
                unique_files = list(set(document['files']))
                if len(unique_files) != len(document['files']):
                    updated_fields['files'] = unique_files
                    is_updated = True

            # images 필드 중복 제거
            if 'images' in document:
                unique_images = list(set(document['images']))
                if len(unique_images) != len(document['images']):
                    updated_fields['images'] = unique_images
                    is_updated = True

            # pdfUrl 필드 중복 제거
            if 'pdfUrl' in document:
                # pdfUrl은 단일 값이므로 중복 제거는 필요 없지만, 동일한 값이 여러 번 저장되었을 경우를 대비
                unique_pdf_url = list(set([document['pdfUrl']]))
                if len(unique_pdf_url) == 1:
                    updated_fields['pdfUrl'] = unique_pdf_url[0]
                elif len(unique_pdf_url) > 1:  # 이 경우 중복이 있었다는 뜻
                    updated_fields['pdfUrl'] = unique_pdf_url[0]
                    is_updated = True

            # 문서 업데이트
            if is_updated:
                collection.update_one(
                    {'_id': document_id},
                    {'$set': updated_fields}
                )
                print(f"Document {document_id} in collection {collection_name} updated.")

# 실행
deduplicate_urls_in_notices_collections()
