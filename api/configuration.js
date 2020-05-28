module.exports = {
    name: "HELM REST API",
    server : {
        port : 3000
    },
    aks: {
        subscriptionId : process.env.AKS_SUBSCRIPTION_ID,
        resourceGroup : process.env.AKS_RESOURCE_GROUP,
        name : process.env.AKS_NAME,
    }
}
