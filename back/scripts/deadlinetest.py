import pytesseract
from PIL import Image

# 이미지 열기
image = Image.open('C:/Users/ds/Downloads/005.jpg')

# OCR 실행 (한국어와 영어 사용)
text = pytesseract.image_to_string(image, lang='kor+eng')

print(text)
