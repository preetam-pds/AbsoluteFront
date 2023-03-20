.PHONY: build-RuntimeDependenciesLayer build-lambda-common
.PHONY: build-getAllItemsFunction build-getByIdFunction build-putItemFunction

build-getAllStoresFunction:
	$(MAKE) HANDLER=src/handlers/get-all-stores.ts build-lambda-common
build-loginFunction:
	$(MAKE) HANDLER=src/handlers/login.ts build-lambda-common
build-addStoreFunction:
	$(MAKE) HANDLER=src/handlers/add-store.ts build-lambda-common
build-updateStoreFunction:
	$(MAKE) HANDLER=src/handlers/update-store.ts build-lambda-common
build-bulkInsertStoresFunction:
	$(MAKE) HANDLER=src/handlers/bulk-insert-stores.ts build-lambda-common
build-sendEmailFunction:
	$(MAKE) HANDLER=src/handlers/send-email.ts build-lambda-common

build-lambda-common:
	npm install
	rm -rf dist
	echo "{\"extends\": \"./tsconfig.json\", \"include\": [\"${HANDLER}\"] }" > tsconfig-only-handler.json
	npm run build -- --build tsconfig-only-handler.json
	cp -r dist "$(ARTIFACTS_DIR)/"

build-RuntimeDependenciesLayer:
	mkdir -p "$(ARTIFACTS_DIR)/nodejs"
	cp package.json package-lock.json "$(ARTIFACTS_DIR)/nodejs/"
	npm install "$(ARTIFACTS_DIR)/nodejs/"
	rm "$(ARTIFACTS_DIR)/nodejs/package.json" # to avoid rebuilding when changes doesn't relate to dependencies
