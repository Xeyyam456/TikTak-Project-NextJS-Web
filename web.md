# Tiktak | Web (Client) API Endpoints

Split from API_ENDPOINTS.md (web/client scope only).

# Tiktak | E-commerce Api's | Stage 3-4 Final

Auto-generated from Postman collection.

# API BASE URL

`https://api.sarkhanrahimli.dev/api/tiktak`

# API HEADER for All request

`headers:{
"Autharzation":`Bearer ${your_access_token}`,
"Content-Type":"application/json"
}`

# Web

## Auth

#### login

`POST {{BASE_URL}}/api/tiktak/auth/login`

- Headers:
  - `Accept-Language: {{LANG}}`

**Request body:**

```json
{
  "phone": "+994516667766",
  "password": "12345"
}
```

**Response (200 OK):**

```json
{
  "message": "Ok",
  "data": {
    "tokens": {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Iis5OTQ1MTY2Njc3NjYiLCJzdWIiOjMsImlhdCI6MTc0OTcyMTY3OSwiZXhwIjoxNzQ5NzY0ODc5fQ.QS98eE6vIWdhgj8Ds1qf0kfoyZRoLIhZvWK8TPA1YbI",
      "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Iis5OTQ1MTY2Njc3NjYiLCJzdWIiOjMsImlhdCI6MTc0OTcyMTY3OSwiZXhwIjoxNzQ5ODA4MDc5fQ.k_Q6-UYkZWa2xp06ZN6l6KzLKhjHegK7bZPOixS5zcU"
    },
    "profile": {
      "id": 3,
      "full_name": "John Doe",
      "phone": "+994516667766",
      "address": null,
      "img_url": null,
      "role": "COMMERCE",
      "created_at": "2025-06-12T05:47:24.588Z"
    }
  },
  "result": true
}
```

#### signup

`POST {{BASE_URL}}/api/tiktak/auth/signup`

- Headers:
  - `Accept-Language: {{LANG}}`

**Request body:**

```json
{
  "password": "1234",
  "full_name": "John Doe",
  "phone": "+994516667766"
}
```

**Response (201 Created):**

```json
{
  "message": "Successfully registered",
  "data": null,
  "result": true
}
```

#### refresh

`POST {{BASE_URL}}/api/tiktak/auth/refresh`

- Headers:
  - `Accept-Language: {{LANG}}`

**Request body:**

```json
{
  "refresh_token": "{{REFRESH_TOKEN}}"
}
```

**Response (200 OK):**

```json
{
  "message": "Ok",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Iis5OTQxMDU1NTQ0MjIiLCJzdWIiOjIsImlhdCI6MTc0OTcyMzI4MCwiZXhwIjoxNzQ5NzY2NDgwfQ.A8MRmax-J5n20a2_2xMPetQTWKX0-NUordGaQYkF1U0",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Iis5OTQxMDU1NTQ0MjIiLCJzdWIiOjIsImlhdCI6MTc0OTcyMzI4MCwiZXhwIjoxNzQ5ODA5NjgwfQ.91vbJDglJUD-KJ1ba8DZ49TM2EX6ElZnUcbID0j45DA"
  },
  "result": true
}
```

## Profile

#### profile

`GET {{BASE_URL}}/api/tiktak/profile`

- Auth: bearer

- Headers:
  - `Accept-Language: {{LANG}}`

**Response (200 OK):**

```json
{
  "message": "Ok",
  "data": {
    "id": 3,
    "full_name": "John Doe",
    "phone": "+994516667766",
    "address": null,
    "img_url": null,
    "role": "COMMERCE",
    "created_at": "2025-06-12T05:47:24.588Z"
  },
  "result": true
}
```

#### profile

`PUT {{BASE_URL}}/api/tiktak/profile`

- Auth: bearer

- Headers:
  - `Accept-Language: {{LANG}}`

**Request body:**

```json
{
  "full_name": "John Doe",
  "img_url": "https://avatars.githubusercontent.com/u/61918721?v=4?s=400",
  // "password": "12345", /*OPTIONAL - When change your password */
  // "password_repeat": "12345",  /*OPTIONAL - When change your password */
  "address": "Aga Neymatulla 80"
}
```

**Response (200 OK):**

```json
{
  "message": "Ok",
  "data": {
    "id": 3,
    "full_name": "John Doe",
    "phone": "+994516667766",
    "address": "Aga Neymatulla 80",
    "img_url": "https://avatars.githubusercontent.com/u/61918721?v=4?s=400",
    "role": "COMMERCE",
    "created_at": "2025-06-12T05:47:24.588Z"
  },
  "result": true
}
```

## Products

### Favorites

##### favorite

`POST {{BASE_URL}}/api/tiktak/products/1/favorite`

- Auth: bearer

**Response (201 Created):**

```json
{
  "message": "Successfully added favorites",
  "data": null,
  "result": true
}
```

**Response (201 Created):**

```json
{
  "message": "Successfully removed favorites",
  "data": null,
  "result": true
}
```

##### favorites

`GET {{BASE_URL}}/api/tiktak/products/favorites`

- Auth: bearer

**Response (200 OK):**

```json
{
  "message": "Ok",
  "data": [
    {
      "id": 1,
      "title": "Producty-1",
      "img_url": "",
      "description": "Lorem ipsum",
      "price": "12.90",
      "type": "kg",
      "created_at": "2025-06-12T06:38:08.292Z",
      "category": {
        "id": 1,
        "name": "Elektronika",
        "img_url": "https://www.tiktak.az/cdn-cgi/image/width=600,height=400,quality=80,format=auto/https://www.tiktak.az/media/catalog/category/elektronika.jpg",
        "description": "Smartfonlar, laptoplar, televizorlar ve daha fazlasi.",
        "created_at": "2025-06-12T05:37:56.753Z"
      }
    }
  ],
  "result": true
}
```

### Basket

##### list

`GET {{BASE_URL}}/api/tiktak/basket`

- Auth: bearer

- Query params:

  - `limit` (disabled)
  - `page` (disabled)
  - `search` — product title and desc, price (disabled)
  - `category_id` (disabled)

- Headers:
  - `Accept-Language: {{LANG}}`

**Response (200 OK):**

```json
{
  "items": [],
  "total": "0.00",
  "count": 0
}
```

**Response (200 OK):**

```json
{
  "message": "Ok",
  "data": {
    "items": [
      {
        "id": 8,
        "quantity": 1,
        "total_price": "12.90",
        "product": {
          "id": 5,
          "title": "Producty-2 Icki",
          "img_url": "",
          "description": "Lorem ipsum",
          "price": "12.90",
          "type": "litre",
          "created_at": "2025-06-13T04:54:05.529Z",
          "category": {
            "id": 1,
            "name": "Elektronika",
            "img_url": "https://www.tiktak.az/cdn-cgi/image/width=600,height=400,quality=80,format=auto/https://www.tiktak.az/media/catalog/category/elektronika.jpg",
            "description": "Smartfonlar, laptoplar, televizorlar ve daha fazlasi.",
            "created_at": "2025-06-12T05:37:56.753Z"
          }
        }
      }
    ],
    "total": "12.90",
    "count": 1
  },
  "result": true
}
```

##### clear

`DELETE {{BASE_URL}}/api/tiktak/basket/clear`

- Auth: bearer

- Query params:

  - `limit` (disabled)
  - `page` (disabled)
  - `search` — product title and desc, price (disabled)
  - `category_id` (disabled)

- Headers:
  - `Accept-Language: {{LANG}}`

**Response (200 OK):**

```json
{
  "message": "Ok",
  "data": {
    "items": [],
    "total": "0.00",
    "count": 0
  },
  "result": true
}
```

##### remove

`POST {{BASE_URL}}/api/tiktak/basket/6/remove`

- Auth: bearer

- Query params:

  - `limit` (disabled)
  - `page` (disabled)
  - `search` — product title and desc, price (disabled)
  - `category_id` (disabled)

- Headers:
  - `Accept-Language: {{LANG}}`

**Response (201 Created):**

```json
{
  "message": "Ok",
  "data": {
    "items": [
      {
        "id": 2,
        "quantity": 5,
        "total_price": "64.50",
        "product": {
          "id": 5,
          "title": "Producty-2 Icki",
          "img_url": "",
          "description": "Lorem ipsum",
          "price": "12.90",
          "type": "litre",
          "created_at": "2025-06-13T04:54:05.529Z",
          "category": {
            "id": 1,
            "name": "Elektronika",
            "img_url": "https://www.tiktak.az/cdn-cgi/image/width=600,height=400,quality=80,format=auto/https://www.tiktak.az/media/catalog/category/elektronika.jpg",
            "description": "Smartfonlar, laptoplar, televizorlar ve daha fazlasi.",
            "created_at": "2025-06-12T05:37:56.753Z"
          }
        }
      },
      {
        "id": 3,
        "quantity": 2,
        "total_price": "17.80",
        "product": {
          "id": 6,
          "title": "Producty-3 Icki",
          "img_url": "",
          "description": "Lorem ipsum",
          "price": "8.90",
          "type": "litre",
          "created_at": "2025-06-13T04:54:30.963Z",
          "category": {
            "id": 1,
            "name": "Elektronika",
            "img_url": "https://www.tiktak.az/cdn-cgi/image/width=600,height=400,quality=80,format=auto/https://www.tiktak.az/media/catalog/category/elektronika.jpg",
            "description": "Smartfonlar, laptoplar, televizorlar ve daha fazlasi.",
            "created_at": "2025-06-12T05:37:56.753Z"
          }
        }
      }
    ],
    "total": "82.30",
    "count": 7
  },
  "result": true
}
```

##### remove all product

`DELETE {{BASE_URL}}/api/tiktak/basket/5/remove-all`

- Auth: bearer

- Query params:

  - `limit` (disabled)
  - `page` (disabled)
  - `search` — product title and desc, price (disabled)
  - `category_id` (disabled)

- Headers:
  - `Accept-Language: {{LANG}}`

**Response (200 OK):**

```json
{
  "message": "Ok",
  "data": {
    "items": [
      {
        "id": 6,
        "quantity": 2,
        "total_price": "17.80",
        "product": {
          "id": 6,
          "title": "Producty-3 Icki",
          "img_url": "",
          "description": "Lorem ipsum",
          "price": "8.90",
          "type": "litre",
          "created_at": "2025-06-13T04:54:30.963Z",
          "category": {
            "id": 1,
            "name": "Elektronika",
            "img_url": "https://www.tiktak.az/cdn-cgi/image/width=600,height=400,quality=80,format=auto/https://www.tiktak.az/media/catalog/category/elektronika.jpg",
            "description": "Smartfonlar, laptoplar, televizorlar ve daha fazlasi.",
            "created_at": "2025-06-12T05:37:56.753Z"
          }
        }
      }
    ],
    "total": "17.80",
    "count": 2
  },
  "result": true
}
```

##### add

`POST {{BASE_URL}}/api/tiktak/basket/5/add`

- Auth: bearer

- Query params:

  - `limit` (disabled)
  - `page` (disabled)
  - `search` — product title and desc, price (disabled)
  - `category_id` (disabled)

- Headers:
  - `Accept-Language: {{LANG}}`

**Response (201 Created):**

```json
{
  "message": "Ok",
  "data": {
    "items": [
      {
        "id": 2,
        "quantity": 9,
        "total_price": "116.10",
        "product": {
          "id": 5,
          "title": "Producty-2 Icki",
          "img_url": "",
          "description": "Lorem ipsum",
          "price": "12.90",
          "type": "litre",
          "created_at": "2025-06-13T04:54:05.529Z",
          "category": {
            "id": 1,
            "name": "Elektronika",
            "img_url": "https://www.tiktak.az/cdn-cgi/image/width=600,height=400,quality=80,format=auto/https://www.tiktak.az/media/catalog/category/elektronika.jpg",
            "description": "Smartfonlar, laptoplar, televizorlar ve daha fazlasi.",
            "created_at": "2025-06-12T05:37:56.753Z"
          }
        }
      },
      {
        "id": 3,
        "quantity": 2,
        "total_price": "17.80",
        "product": {
          "id": 6,
          "title": "Producty-3 Icki",
          "img_url": "",
          "description": "Lorem ipsum",
          "price": "8.90",
          "type": "litre",
          "created_at": "2025-06-13T04:54:30.963Z",
          "category": {
            "id": 1,
            "name": "Elektronika",
            "img_url": "https://www.tiktak.az/cdn-cgi/image/width=600,height=400,quality=80,format=auto/https://www.tiktak.az/media/catalog/category/elektronika.jpg",
            "description": "Smartfonlar, laptoplar, televizorlar ve daha fazlasi.",
            "created_at": "2025-06-12T05:37:56.753Z"
          }
        }
      }
    ],
    "total": "133.90",
    "count": 11
  },
  "result": true
}
```

##### remove all product

`DELETE {{BASE_URL}}/api/tiktak/basket/5/remove-all`

- Auth: bearer

- Query params:

  - `limit` (disabled)
  - `page` (disabled)
  - `search` — product title and desc, price (disabled)
  - `category_id` (disabled)

- Headers:
  - `Accept-Language: {{LANG}}`

**Response (200 OK):**

```json
{
  "message": "Ok",
  "data": {
    "items": [
      {
        "id": 6,
        "quantity": 2,
        "total_price": "17.80",
        "product": {
          "id": 6,
          "title": "Producty-3 Icki",
          "img_url": "",
          "description": "Lorem ipsum",
          "price": "8.90",
          "type": "litre",
          "created_at": "2025-06-13T04:54:30.963Z",
          "category": {
            "id": 1,
            "name": "Elektronika",
            "img_url": "https://www.tiktak.az/cdn-cgi/image/width=600,height=400,quality=80,format=auto/https://www.tiktak.az/media/catalog/category/elektronika.jpg",
            "description": "Smartfonlar, laptoplar, televizorlar ve daha fazlasi.",
            "created_at": "2025-06-12T05:37:56.753Z"
          }
        }
      }
    ],
    "total": "17.80",
    "count": 2
  },
  "result": true
}
```

#### id

`GET {{BASE_URL}}/api/tiktak/products/1`

- Auth: bearer

**Response (200 OK):**

```json
{
  "message": "Ok",
  "data": {
    "id": 1,
    "title": "Producty-1",
    "img_url": "",
    "description": "Lorem ipsum",
    "price": "12.90",
    "type": "kg",
    "created_at": "2025-06-12T06:38:08.292Z",
    "category": {
      "id": 1,
      "name": "Elektronika"
    },
    "is_favorite": false
  },
  "result": true
}
```

#### list

`GET {{BASE_URL}}/api/tiktak/products`

- Auth: bearer

- Query params:

  - `limit` (disabled)
  - `page` (disabled)
  - `search` — product title and desc, price (disabled)
  - `category_id` (disabled)

- Headers:
  - `Accept-Language: {{LANG}}`

**Response (200 OK):**

```json
{
  "message": "Ok",
  "data": [
    {
      "id": 3,
      "title": "Producty-2 Icki",
      "img_url": "",
      "description": "Lorem ipsum",
      "price": "12.90",
      "type": "litre",
      "created_at": "2025-06-12T06:49:09.440Z",
      "category": {
        "id": 1,
        "name": "Elektronika"
      }
    },
    {
      "id": 1,
      "title": "Producty-1",
      "img_url": "",
      "description": "Lorem ipsum",
      "price": "12.90",
      "type": "kg",
      "created_at": "2025-06-12T06:38:08.292Z",
      "category": {
        "id": 1,
        "name": "Elektronika"
      }
    }
  ],
  "pagination": {
    "next": null,
    "prev": null,
    "current": 1,
    "total": 2,
    "totalPages": 1
  },
  "result": true
}
```

## Category

#### list

`GET {{BASE_URL}}/api/tiktak/categories`

- Auth: bearer

- Headers:
  - `Accept-Language: {{LANG}}`

**Response (200 OK):**

```json
{
  "message": "Ok",
  "data": [
    {
      "id": 1,
      "name": "Elektronika",
      "img_url": "https://www.tiktak.az/cdn-cgi/image/width=600,height=400,quality=80,format=auto/https://www.tiktak.az/media/catalog/category/elektronika.jpg",
      "description": "Smartfonlar, laptoplar, televizorlar ve daha fazlasi.",
      "created_at": "2025-06-12T05:37:56.753Z"
    },
    {
      "id": 2,
      "name": "Moda",
      "img_url": "https://www.tiktak.az/cdn-cgi/image/width=600,height=400,quality=80,format=auto/https://www.tiktak.az/media/catalog/category/moda.jpg",
      "description": "En yeni kolleksiyalar, aksesuarlari ve kisisel bakim mehsullari.",
      "created_at": "2025-06-12T05:37:56.753Z"
    },
    {
      "id": 3,
      "name": "Ev ve Bahce",
      "img_url": "https://www.tiktak.az/cdn-cgi/image/width=600,height=400,quality=80,format=auto/https://www.tiktak.az/media/catalog/category/ev_bahce.jpg",
      "description": "Ev dekorasyon, mebel, bahce aksesuarlari ve daha fazlasi.",
      "created_at": "2025-06-12T05:37:56.753Z"
    },
    {
      "id": 4,
      "name": "Spor ve Aciq Hava",
      "img_url": "https://www.tiktak.az/cdn-cgi/image/width=600,height=400,quality=80,format=auto/https://www.tiktak.az/media/catalog/category/spor.jpg",
      "description": "Idman ekipmanlari, aciq hava feliyyetleri ve fitness mehsullari.",
      "created_at": "2025-06-12T05:37:56.753Z"
    },
    {
      "id": 5,
      "name": "Kitab ve Kancalariya",
      "img_url": "https://www.tiktak.az/cdn-cgi/image/width=600,height=400,quality=80,format=auto/https://www.tiktak.az/media/catalog/category/kitab.jpg",
      "description": "Kitablar, tedris materiallari ve ofis kancalariyasi.",
      "created_at": "2025-06-12T05:37:56.753Z"
    },
    {
      "id": 6,
      "name": "Oyuncaq ve Usaq",
      "img_url": "https://www.tiktak.az/cdn-cgi/image/width=600,height=400,quality=80,format=auto/https://www.tiktak.az/media/catalog/category/oyuncaq.jpg",
      "description": "Usaq oyuncaqlari, gelisim oyunlari ve ana-baba mehsullari.",
      "created_at": "2025-06-12T05:37:56.753Z"
    },
    {
      "id": 7,
      "name": "Avtomobil",
      "img_url": "https://www.tiktak.az/cdn-cgi/image/width=600,height=400,quality=80,format=auto/https://www.tiktak.az/media/catalog/category/avtomobil.jpg",
      "description": "Avto aksesuarlari, ehtiyat hisseleri ve avtomobil bakim mehsullari.",
      "created_at": "2025-06-12T05:37:56.753Z"
    },
    {
      "id": 8,
      "name": "Saglamliq ve Guzuluk",
      "img_url": "https://www.tiktak.az/cdn-cgi/image/width=600,height=400,quality=80,format=auto/https://www.tiktak.az/media/catalog/category/saglamliq.jpg",
      "description": "Kosmetika, parfumlar, saglamliq mehsullari ve vitamin takviyeleri.",
      "created_at": "2025-06-12T05:37:56.753Z"
    },
    {
      "id": 9,
      "name": "Mutfaq ve Yemek",
      "img_url": "https://www.tiktak.az/cdn-cgi/image/width=600,height=400,quality=80,format=auto/https://www.tiktak.az/media/catalog/category/mutfaq.jpg",
      "description": "Mutfaq avadanliqlari, yemek hazirlanmasi ve qida mehsullari.",
      "created_at": "2025-06-12T05:37:56.753Z"
    },
    {
      "id": 10,
      "name": "Hediyyeler",
      "img_url": "https://www.tiktak.az/cdn-cgi/image/width=600,height=400,quality=80,format=auto/https://www.tiktak.az/media/catalog/category/hediyye.jpg",
      "description": "Xususi gunler ucun hediyyeler, suvenirler ve dekorativ esyalar.",
      "created_at": "2025-06-12T05:37:56.753Z"
    }
  ],
  "result": true
}
```

## Campaign

#### list

`GET {{BASE_URL}}/api/tiktak/campaigns`

- Auth: bearer

- Headers:
  - `Accept-Language: {{LANG}}`

**Response (200 OK):**

```json
{
  "message": "Ok",
  "data": [
    {
      "id": 3,
      "title": "Tiktak yenilik",
      "description": null,
      "img_url": null,
      "created_at": "2025-06-12T05:40:42.843Z"
    },
    {
      "id": 4,
      "title": "Yaz kampanyasi",
      "description": null,
      "img_url": null,
      "created_at": "2025-06-12T05:40:42.843Z"
    },
    {
      "id": 5,
      "title": "Yilbasi kampanyasi",
      "description": null,
      "img_url": null,
      "created_at": "2025-06-12T05:40:42.843Z"
    },
    {
      "id": 6,
      "title": "Teknoloji Festivali",
      "description": null,
      "img_url": null,
      "created_at": "2025-06-12T05:40:42.843Z"
    },
    {
      "id": 7,
      "title": "Moda Heftesi",
      "description": null,
      "img_url": null,
      "created_at": "2025-06-12T05:40:42.843Z"
    }
  ],
  "result": true
}
```

## Order

#### checkout

`POST {{BASE_URL}}/api/tiktak/orders/checkout`

- Auth: bearer

- Headers:
  - `Accept-Language: {{LANG}}`

**Request body:**

```json
{
  "paymentMethod": "CARD" /* Enum CASH CARD */,
  "note": "Lorem ipsum",
  "address": "Aga Neymatulla",
  "phone": "+994103193897"
}
```

**Response (201 Created):**

```json
{
  "id": 1,
  "orderNumber": "ORD-20250613-630",
  "total": "18.89",
  "deliveryFee": "0.00",
  "paymentMethod": "CARD",
  "status": "PENDING",
  "note": "Lorem ipsum",
  "address": "Aga Neymatulla",
  "phone": "+994103193897",
  "createdAt": "2025-06-13T07:35:41.867Z",
  "updatedAt": "2025-06-13T07:35:41.867Z",
  "user": {
    "id": 3,
    "full_name": "John Doe",
    "phone": "+994516667766",
    "address": "Aga Neymatulla 80",
    "img_url": "https://avatars.githubusercontent.com/u/61918721?v=4?s=400",
    "role": "COMMERCE",
    "password": "$2b$10$/glCjvrEoAccPELPqqSQ7ON7ifto6NCyIjtl7zwwC88KRIWrGXTlC",
    "created_at": "2025-06-12T05:47:24.588Z"
  },
  "items": [
    {
      "id": 1,
      "quantity": 1,
      "total_price": "12.90",
      "product": {
        "id": 5,
        "title": "Producty-2 Icki",
        "img_url": "",
        "description": "Lorem ipsum",
        "price": "12.90",
        "type": "litre",
        "created_at": "2025-06-13T04:54:05.529Z",
        "category": {
          "id": 1,
          "name": "Elektronika",
          "img_url": "https://www.tiktak.az/cdn-cgi/image/width=600,height=400,quality=80,format=auto/https://www.tiktak.az/media/catalog/category/elektronika.jpg",
          "description": "Smartfonlar, laptoplar, televizorlar ve daha fazlasi.",
          "created_at": "2025-06-12T05:37:56.753Z"
        }
      }
    }
  ]
}
```

**Response (400 Bad Request):**

```json
{
  "statusCode": 400,
  "message": "Basket is empty. Add items before checkout.",
  "result": false
}
```

#### list

`GET {{BASE_URL}}/api/tiktak//orders/user`

- Auth: bearer

- Headers:
  - `Accept-Language: {{LANG}}`

**Request body:**

```json
{
  "basket_id": 1,
  "payment": "CARD" /* Enum CASH CARD */,
  "note": "Lorem ipsum"
}
```

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "orderNumber": "ORD-20250613-630",
    "total": "18.89",
    "deliveryFee": "0.00",
    "paymentMethod": "CARD",
    "status": "PENDING",
    "note": "Lorem ipsum",
    "address": "Aga Neymatulla",
    "phone": "+994103193897",
    "createdAt": "2025-06-13T07:35:41.867Z",
    "updatedAt": "2025-06-13T07:35:41.867Z",
    "items": [
      {
        "id": 1,
        "quantity": 1,
        "total_price": "12.90",
        "product": {
          "id": 5,
          "title": "Producty-2 Icki",
          "img_url": "",
          "description": "Lorem ipsum",
          "price": "12.90",
          "type": "litre",
          "created_at": "2025-06-13T04:54:05.529Z",
          "category": {
            "id": 1,
            "name": "Elektronika",
            "img_url": "https://www.tiktak.az/cdn-cgi/image/width=600,height=400,quality=80,format=auto/https://www.tiktak.az/media/catalog/category/elektronika.jpg",
            "description": "Smartfonlar, laptoplar, televizorlar ve daha fazlasi.",
            "created_at": "2025-06-12T05:37:56.753Z"
          }
        }
      }
    ]
  }
]
```

#### id

`GET {{BASE_URL}}/api/tiktak/orders/user/1`

- Auth: bearer

- Headers:
  - `Accept-Language: {{LANG}}`

**Request body:**

```json
{
  "basket_id": 1,
  "payment": "CARD" /* Enum CASH CARD */,
  "note": "Lorem ipsum"
}
```

**Response (200 OK):**

```json
{
  "id": 1,
  "orderNumber": "ORD-20250613-630",
  "total": "18.89",
  "deliveryFee": "0.00",
  "paymentMethod": "CARD",
  "status": "PENDING",
  "note": "Lorem ipsum",
  "address": "Aga Neymatulla",
  "phone": "+994103193897",
  "createdAt": "2025-06-13T07:35:41.867Z",
  "updatedAt": "2025-06-13T07:35:41.867Z",
  "items": [
    {
      "id": 1,
      "quantity": 1,
      "total_price": "12.90",
      "product": {
        "id": 5,
        "title": "Producty-2 Icki",
        "img_url": "",
        "description": "Lorem ipsum",
        "price": "12.90",
        "type": "litre",
        "created_at": "2025-06-13T04:54:05.529Z",
        "category": {
          "id": 1,
          "name": "Elektronika",
          "img_url": "https://www.tiktak.az/cdn-cgi/image/width=600,height=400,quality=80,format=auto/https://www.tiktak.az/media/catalog/category/elektronika.jpg",
          "description": "Smartfonlar, laptoplar, televizorlar ve daha fazlasi.",
          "created_at": "2025-06-12T05:37:56.753Z"
        }
      }
    }
  ]
}
```

#### id

`GET {{BASE_URL}}/api/tiktak/orders/user/1`

- Auth: bearer

- Headers:
  - `Accept-Language: {{LANG}}`

**Request body:**

```json
{
  "basket_id": 1,
  "payment": "CARD" /* Enum CASH CARD */,
  "note": "Lorem ipsum"
}
```

**Response (200 OK):**

```json
{
  "id": 1,
  "orderNumber": "ORD-20250613-630",
  "total": "18.89",
  "deliveryFee": "0.00",
  "paymentMethod": "CARD",
  "status": "PENDING",
  "note": "Lorem ipsum",
  "address": "Aga Neymatulla",
  "phone": "+994103193897",
  "createdAt": "2025-06-13T07:35:41.867Z",
  "updatedAt": "2025-06-13T07:35:41.867Z",
  "items": [
    {
      "id": 1,
      "quantity": 1,
      "total_price": "12.90",
      "product": {
        "id": 5,
        "title": "Producty-2 Icki",
        "img_url": "",
        "description": "Lorem ipsum",
        "price": "12.90",
        "type": "litre",
        "created_at": "2025-06-13T04:54:05.529Z",
        "category": {
          "id": 1,
          "name": "Elektronika",
          "img_url": "https://www.tiktak.az/cdn-cgi/image/width=600,height=400,quality=80,format=auto/https://www.tiktak.az/media/catalog/category/elektronika.jpg",
          "description": "Smartfonlar, laptoplar, televizorlar ve daha fazlasi.",
          "created_at": "2025-06-12T05:37:56.753Z"
        }
      }
    }
  ]
}
```

# Upload

### upload

`POST {{BASE_URL}}/api/tiktak/upload`

- Auth: bearer

**Response (201 Created):**

```json
{
  "message": "File uploaded successfully",
  "data": {
    "url": "https://uploads.sarkhanrahimli.dev/onlearn/images/onlearn-file-2025_06_13_17_19_56-u72jzi.webp"
  },
  "result": true
}
```
