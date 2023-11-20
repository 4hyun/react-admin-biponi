Biponi is full featured eCommerce CMS built with Next.js.
Great UI/UX design will give your customers smooth shopping experience.
You can easily install on Vercel or Heroku for free.
And the installation process is very simple.
Our support team also standby to help you.
Biponi also comes with 1 click demo install.
Which will seed your database with the dummy data.

## Step 1: Install the dependencies

First install the dependencies

```bash
npm install
# or
yarn
```

## Step 2: Database, Storage & Payment gateway

1. Create a mongoDB database at https://mongodb.com then copy your database uri and put in .env file.
   You can use any mongoDB service or installation. We recommended mongodb.com because it has free tier and easy to set up.
   Video instruction: [Create a mongoDB Database - UI Lib](https://youtu.be/dX85V823wj0)

2. For file storage we used AWS s3, it's almost FREE!. Get the AWS_ACCESS_KEY, AWS_SECRET_KEY and storage bucket name. Please follow our video instruction if you don't know how to get those information.
   Video instruction: [AWS S3 Bucket & Permission ](https://youtu.be/JXOUwy_7G7Q)

3. Update next.config.js, update domain url string in Domain array

```
images: {
    domains: ["<bucket-name>.s3.<region-name>.amazonaws.com"]
},
// Exaple:
images: {
    domains: ["bazar-shop.s3.ap-south-1.amazonaws.com"]
},
```

4. Get the Stripe secret key at https://dashboard.stripe.com/apikeys
   and set the STRIPE_KEY value.

Create a .env.locale or .env file in project root and put it all env variables.

Example .env file

```
MONGO_URI=your mongodb uri
STRIPE_KEY=your stripe account secret key
JWT_SECRET=JWT secret key
NEXTAUTH_URL=you domain address -> https://youwebsite.com
NEXTAUTH_SECRET=a secret key -> (2af126f74c)

AWS_BUCKET_NAME=AWS S3 bucket name
AWS_BUCKET_REGION=AWS S3 bucket region
AWS_ACCESS_KEY=AWS S3 access key
AWS_SECRET_KEY=AWS S3 secret key

```

## Step 3: Push Seed Data in Database

### Run the development server:

```bash
npm run dev
# or
yarn dev
```

### Seed data

Type in browser address bar: [http://localhost:3000/api/seeder](http://localhost:3000/)

After seed completion delete folder from -> pages/api/seeder

### Admin and User Login Access

```
User
Email: user@example.com
Password: user123

Admin
Email: admin@example.com
Password: 123456

Super Admin
Email: superadmin@gmail.com
Password: Admin1234
```

After logging in with these credentials reset your email and password.
You can rest user info from admin -> Users

## Remove Permission Denied Edit Demo Warning

You can find the adminMiddleware file by opening `src/__server__/middleware`. Remove all of the code from the if case there. Insert the following code.

```ts
const adminMiddleware = async (req: ExtendNextApiRequest, res: NextApiResponse, next: Function) => {
  try {
    const user = await User.findById(req.user);

    if (user && user.role === "admin") {
      /**
       *    REMOVE CODE
       */
      // if (req.method === "GET" || user.email === "superadmin@gmail.com") {
      //   await next();
      // } else {
      //   return res.status(401).send("Permission Denied Edit Demo!");
      // }

      /**
       *    INSERT CODE
       */
      await next();
    } else {
      res.status(401);
      throw new Error("Unauthorized Access!");
    }
  } catch (error) {
    errorResponse(error);
  }
};
```

## Deploying to remote server.

### Heroku deployment

1. Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

2. Update start script in package.json, add `-p $PORT`

```
"scripts": {
    "start": "next start -p $PORT"
}
```

3. Create a Heroku app

```
heroku create $APP_NAME
```

4. Heroku will give you your app URL example: https://[APP_NAME].herokuapp.com
   Copy the url and paste value in .env file for NEXTAUTH_URL

5. Login to your [heroku dashboard](https://dashboard.heroku.com/apps).
   Go to You heroku Project > Settings > Config Vars
   Add following config var
   Key: NODE_OPTIONS value: --max-old-space-size=4096

6. Commit your code to git

```
git init
git add .
git commit -am "Initial commit"
```

7. Push your code the the Heroku app

```
git push heroku master
```

Tip: If you are on a branch other than master (say main or production), you can push your code like this:

```
git push heroku [your branch name]:master
```

Once deployment done! you can access your app at https://[APP_NAME].herokuapp.com

## Support

If you need further help please contact us at [support@ui-lib.com](mailto:support@ui-lib.com)
