import { Stack, StackProps, Aws } from 'aws-cdk-lib';
import {
  aws_iam as iam,
  aws_s3 as s3,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class S3ObjectStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

        // Set up a bucket
        new s3.Bucket(this, 'example-bucket', {
        accessControl: s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
        encryption: s3.BucketEncryption.S3_MANAGED,
        blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL
      });
    }
}