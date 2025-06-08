const hre = require("hardhat");

async function main() {
    const Votacion = await hre.ethers.getContractFactory("Votacion");
    const votacion = await Votacion.deploy();
    console.log("Votacion deployed to:", votacion.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});