const request = require('request-promise-native');

const config = require('../configuration');
const {run} = require('../helm');

module.exports = async (req, res) => {
    try {
        //const output = await run('list --output json');
        //const releases = JSON.parse(output.stdOut);
        //res.send(JSON.stringify(releases, null, 4));

        const kc = await getKubeConfig();
        res.setHeader('Content-Type', 'text/plain');
        res.send(kc);

    } catch (error) {
        console.error(error);
        res.send(error.toString());
    }
}

async function getKubeConfig() {
    const token = await getManagedIdentity();
    return getAdminCredentials(token);
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

async function getAdminCredentials({access_token, token_type}) {
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
    return Buffer.from(value, 'base64').toString('utf-8');
}
