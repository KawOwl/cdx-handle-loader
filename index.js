'use strict';

const dirTree = require('./lib/directory-tree');
const path = require('path');

const handler = {};

function onVisit(node, basePath) {
	if (node.extension === '.js') {
		const temp = require(path.resolve(basePath, node.path));
		handler[temp.name] = temp;
	}
}

function preOrder(node, basePath) {
	onVisit(node, basePath);

	if (!node.children) {
		return;
	}

	if (node.children.length === 0) {
		return;
	}

	node.children.forEach(children => {
		preOrder(children, basePath);
	});
}

exports.loadHandlerFromDir = function test(handlerDir) {
	const tree = dirTree(handlerDir);
	const basePath = path.resolve(handlerDir, '../');
	preOrder(tree, basePath);
}

exports.handlerStore = handler;