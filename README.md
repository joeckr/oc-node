# oc-node
OpenShift compliant Node image

This image is NOT meant to be used as a built stage. For build stages, use the official Node image. This image IS meant to be used as a runtime image.

This image of Node does the following:
- Installs curl for live debugging needs
- Does NOT have NPM as it is not needed at run time
- Updates permissions to the `/src` runtime directory to be OC compliant
