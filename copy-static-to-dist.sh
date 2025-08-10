#!/bin/bash

if cp static.json dist/cooking_class_website/browser/; then
    echo "✅ Copying of the static.json succeeded."
else
    echo "❌ Copying of the static.json failed."
fi