// deploy.js
// deploy.mjs (or deploy.js if your package.json has "type": "module")
import FtpDeploy from "ftp-deploy";
import path from "path";

const ftpDeploy = new FtpDeploy();

const config = {
  user: "thunderayn@2505forever.com",
  password: "Yusisunren@1861", // or use process.env.FTP_PASSWORD
  host:  "frs.bcd.temporary.site",
  port: 21,
  localRoot: path.resolve("./dist"),
  remoteRoot: "/public_html/website_a31bdcb2",
  include: ["*", "**/*"],
  deleteRemote: true,
  forcePasv: true,
};

ftpDeploy
  .deploy(config)
  .then(res => console.log("Finished:", res, "sucessfully deployed!"))
  .catch(err => console.error("Error:", err));

//then in bash run:
// - npm run build
// - node deploy.js
