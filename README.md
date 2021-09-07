# Storefront Backend Project

### Steps to run app:

CREATE USER shopping_user WITH PASSWORD 'password123';\

CREATE DATABASE shopping;\
\c shopping;\
GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;\

CREATE DATABASE shopping_test;\
\c shopping_test;\
GRANT ALL PRIVILEGES ON DATABASE shopping_test TO shopping_user;\

### DB Model

![StoreFront DB Model](https://user-images.githubusercontent.com/14042720/132398146-549e3942-194a-455c-b625-99254e5b2c4e.png)

#### Create env file with the following data:

POSTGRES_HOST = 127.0.0.1\
POSTGRES_DB = 'shopping'\
POSTGRES_TEST_DB = 'shopping_test'\
POSTGRES_USER = 'shopping_user'\
POSTGRES_PASSWORD = 'password123'\
ENV = 'test'\
BCRYPT_PASSWORD='udacity'\
SALT_ROUNDS='10'\
TOKEN_SECRET=carbs_are_life

#### Set Up Database

yarn dropDbTest\
yarn setUpTest\
yarn runTest

#### Start in Watch

yarn watch
