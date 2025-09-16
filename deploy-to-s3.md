# Deploy to AWS S3 Bucket

## Build готов для деплоя

Production билд успешно создан в папке `dist/` со следующими файлами:

### Структура билда:
```
dist/
├── index.html (549 bytes)
├── favicon.svg (670 bytes) 
├── vite.svg (1497 bytes)
└── assets/
    ├── ares_logo-BK1KuYaJ.svg (24.36 kB)
    ├── index-CJXy_nIa.css (47.44 kB)
    ├── index-DH0gyv-k.js (257.08 kB)
    ├── vendor-gH-7aFTg.js (11.83 kB)
    └── recent-files-*.png (4 изображения)
```

### Общий размер: ~390 kB (сжато ~90 kB)

## Инструкции для деплоя на AWS S3

### 1. Создание S3 Bucket
```bash
aws s3 mb s3://your-bucket-name --region us-east-1
```

### 2. Настройка bucket для статического хостинга
```bash
aws s3 website s3://your-bucket-name --index-document index.html --error-document index.html
```

### 3. Загрузка файлов
```bash
aws s3 sync dist/ s3://your-bucket-name --delete
```

### 4. Настройка публичного доступа
```bash
aws s3api put-bucket-policy --bucket your-bucket-name --policy '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}'
```

### 5. Настройка CORS (если нужно)
```bash
aws s3api put-bucket-cors --bucket your-bucket-name --cors-configuration '{
  "CORSRules": [
    {
      "AllowedHeaders": ["*"],
      "AllowedMethods": ["GET", "HEAD"],
      "AllowedOrigins": ["*"],
      "MaxAgeSeconds": 3000
    }
  ]
}'
```

## Альтернативные способы деплоя

### Через AWS CLI одной командой:
```bash
# Загрузка с правильными Content-Type
aws s3 sync dist/ s3://your-bucket-name \
  --delete \
  --cache-control "public,max-age=31536000" \
  --exclude "*.html" \
  --exclude "*.svg"

# HTML файлы без кеширования
aws s3 sync dist/ s3://your-bucket-name \
  --exclude "*" \
  --include "*.html" \
  --cache-control "no-cache"

# SVG файлы
aws s3 sync dist/ s3://your-bucket-name \
  --exclude "*" \
  --include "*.svg" \
  --content-type "image/svg+xml"
```

### Через Terraform:
```hcl
resource "aws_s3_bucket" "website" {
  bucket = "your-bucket-name"
}

resource "aws_s3_bucket_website_configuration" "website" {
  bucket = aws_s3_bucket.website.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}
```

## URL после деплоя
После успешного деплоя приложение будет доступно по адресу:
`http://your-bucket-name.s3-website-us-east-1.amazonaws.com`

## Примечания
- Все файлы минифицированы и оптимизированы для production
- React и React-DOM вынесены в отдельный vendor chunk
- Favicon обновлен на красное пламя из проекта print-to-pdf
- Заголовок страницы: "File Activity Insights"
