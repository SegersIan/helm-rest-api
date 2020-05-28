const request = require('request-promise-native');
const yaml = require('js-yaml');
const uuid = require('uuid');

const config = require('../configuration');
const {run, createKubeConfig} = require('../helm');

module.exports = async (req, res) => {
    try {
        const kubeConfigFile = `kc-${uuid.v4()}`
        const kc = await getKubeConfig(kubeConfigFile);
        const output = await run(`list --output json --kubeconfig /app/api/temp/${kubeConfigFile}`);
        const releases = JSON.parse(output.stdOut);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(releases, null, 4));

    } catch (error) {
        console.error(error);
        res.send(error.toString());
    }
}

async function getKubeConfig(kubeConfigFile) {
    const token = await getManagedIdentity();
    return getAdminCredentials(token, kubeConfigFile);
}

async function getManagedIdentity(resource = "https://management.azure.com") {
    const response = await request({
        method: "get",
        url: "http://169.254.169.254/metadata/identity/oauth2/token",
        qs: {
            "api-version": "2018-02-01",
            "resource": resource
        },
        headers: {
            'Metadata': 'true'
        }
    })
    return JSON.parse(response);
}

async function getAdminCredentials({access_token, token_type}, kubeConfigFile) {
    const response = await request({
        method: "post",
        url: `https://management.azure.com/subscriptions/${config.aks.subscriptionId}/resourceGroups/${config.aks.resourceGroup}/providers/Microsoft.ContainerService/managedClusters/${config.aks.name}/listClusterAdminCredential`,
        qs: {
            "api-version": "2020-03-01"
        },
        headers: {
            "Authorization": `${token_type} ${access_token}`,
            "Content-type": "application/json"
        }
    })
    const {kubeconfigs} = JSON.parse(response);
    const {value} = kubeconfigs[0];
    await createKubeConfig(kubeConfigFile, toYaml(value))
}

function toYaml(base64Value) {
    return Buffer.from(base64Value, 'base64').toString('utf-8');
}
