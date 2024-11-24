Clone the repo


RUN Command

npm install


make env file from env.default

past the content 

setup your DATABASE_URL connection


RUN 

npx prisma migrate dev


THEN

 npx prisma generate

 FINALLY

 npm run dev
