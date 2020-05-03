DOCKER_IMAGE := iansegers/helm-rest
DOCKER_TAG := latest

build:
	echo "Build docker image with '$(DOCKER_TAG)' tag."
	docker build --file Dockerfile --no-cache -t $(DOCKER_IMAGE):$(DOCKER_TAG) .

publish:
	echo "Push docker image to Docker Hub."
	docker push $(DOCKER_IMAGE):$(DOCKER_TAG)

start:
	docker run -it --rm -p 3000:3000 --name helm-api $(DOCKER_IMAGE):$(DOCKER_TAG)