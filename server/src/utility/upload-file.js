import { PinataSDK } from "pinata";
import { File } from 'node:buffer'
import fs from 'fs';
import { Blob } from "node:buffer";
import dotenv from "dotenv";
dotenv.config()


const PINATA_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkN2E0NTU5ZC0xNDMwLTQ0ZjQtOWIzYy03MTZlMzI1NTM1YjgiLCJlbWFpbCI6InNhY2hpbmRldmVsb3Blci5jaEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJ"

const PINATA_GATEWAY = "scarlet-permanent-sawfish-663.mypinata.cloud"

const pinata = new PinataSDK({
  pinataJwt: PINATA_JWT,
  pinataGateway: PINATA_GATEWAY,
  pinataGatewayKey:PINATA_GATEWAY
});

console.log(pinata);


console.log(process.env.PINATA_JWT,process.env.PINATA_GATEWAY);

export default async function uploadFileTo_IFPS_Database(data) {
  try {

    // console.log(data);
    
    // console.log(`data coming to upload in ifps db: ${data}`);

    // const formData = new FormData();

    // const json = JSON.stringify(data);

    // const blob = new Blob([json]);
    // const file = new File([blob], "bob.json", { type: "application/json" });

    // formData.append("file", file);

    // formData.append("network", "public");

    // const result = await fetch("https://uploads.pinata.cloud/v3/files", {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${PINATA_JWT}`,
    //   },
    //   body: formData,
    // });


    // const blob = new Blob([fs.readFileSync("./hello-world.txt")]);
    // const file = new File([blob], "hello-world.txt", { type: "text/plain"})
    // const result = await pinata.upload.public.file(file);

    // const result = await pinata.upload.public.json({
    //     id: 2,
    //     name: "Bob Smith",
    //     email: "bob.smith@example.com",
    //     age: 34,
    //     isActive: false,
    //     roles: ["user"],
    //   });


    const file = new File(["hello"], "Testing.txt", { type: "text/plain" });
const result = await pinata.upload.public.file(file);

    // console.log(`after upload : ${result}`);

    // console.log(`Upload successful! IPFS hash: ${result.IpfsHash}`);
    return result;
  } catch (error) {
    console.error(
    //   `upload error while uploading some data to ifps db: ${error}`
    );
    throw error;
  }
}

export { pinata };

