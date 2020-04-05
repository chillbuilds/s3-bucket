# S3 Bucket Shenanigans

A CLI tool for S3 bucket data exchange

Built With Nodejs 
<ul> 
<li>AWS SDK</li>
<li>inquirer</li>
<li>fs</li>
</ul> <br>
Visit <a href='https://console.aws.amazon.com/s3/'>https://console.aws.amazon.com/s3/</a> and create account or sign in<br><br>
Click "Create Bucket" button in top right corner<br><br>
Name your bucket, select your region, and be sure to unblock public access<br><br>
<img src='./assets/images/create-bucket.JPG'>
<br><br>
After Creating Bucket, select your bucket from the list<br><br>
This will take you to the bucket dashboard. <br>
<img src='./assets/images/bucket-ui.JPG'>
<br>From here, click the "Permissions" tab
<br><br>
<img src='./assets/images/bucket-policy.JPG'>
Select the "Bucket Policy" tab, and enter the following<br><br>
 {"Version": "2012-10-17",<br>
    "Statement": [<br>
        {"Sid": "PublicRead",<br>
            "Effect": "Allow",<br>
            "Principal": "*",<br>
            "Action": "s3:GetObject",<br>
            "Resource": "arn:aws:s3:::bucket_name/*"
        }
    ]
}
<br><br>
<p style='font-weight:bold;'>Replace "bucket_name" with your bucket name in the "Resource" section of the Bucket Policy</p><br><br>
Clone repo<br><br>
Run npm i at root<br><br>
Create .env file in repo root and populate using the following template
<br><br>
{"accessKeyId":"enter_access_key_id",<br> "secretAccessKey":"enter_secret_access_key",<br> "bucket":"enter_bucket_name",<br>
"region":"enter_region"}<br><br>
region example: "us-east-2"<br><br>

<img src="./assets/images/startPrompt.JPG" style="width:60%;margin-left:20%">