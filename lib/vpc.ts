import { Construct } from 'constructs'
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
 

export class VPCStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, props);
  

// const vpc = new ec2.Vpc(this, 'TheVPC', {
//     ipAddresses: ec2.IpAddresses.cidr('10.0.0.0/16'),
//   })
  
//   // Iterate the private subnets
//   const selection = vpc.selectSubnets({
//     subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS
//   });
}}

// import * as cdk from 'aws-cdk-lib';
// import { Construct } from 'constructs';
// import * as ec2 from 'aws-cdk-lib/aws-ec2';

// export class VpcStack extends cdk.Stack {
//     public readonly vpc: ec2.Vpc;
//     constructor(scope: Construct, id: string, props?: cdk.StackProps) {
//         super(scope, id, props);

//         this.vpc = new ec2.Vpc(this, 'Vpc', {
//             natGateways: 1,
//         });

//     }
// }