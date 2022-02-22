class Node {
  constructor(id, parentNode, mature) {
    this.id = id;
    this.mature = mature;
    this.left = null;
    this.right = null;
    this.parent = parentNode;
  }
}

class Tree {
  constructor() {
    this.height = 0;
    this.idCount = 1;
    const firstNode = new Node(0, null, 0);
    this.root = firstNode;
    let layerMap = new Map();
    layerMap.set(firstNode, 0);
    this.layerObj = {
      layer0: layerMap,
    };
    this.layerProfit = {
      layer0: { 0: 0 },
    };
  }
  addLayer() {
    let prevLayerNodes = this.layerObj["layer" + this.height].keys();
    let prevLayerProfit = this.layerProfit["layer" + this.height];
    this.height += 1;
    this.layerProfit["layer" + this.height] = {};
    let currentLayerProfit = this.layerProfit["layer" + this.height];
    this.layerObj["layer" + this.height] = new Map();
    let currentLayerMap = this.layerObj["layer" + this.height];

    for (let node of prevLayerNodes) {
      currentLayerProfit[node.id] = prevLayerProfit[node.id];
      currentLayerMap.set;
      if (node.mature) {
        // 更新 node 本身
        // 更新 node 的 left
        node.left = new Node(node.id, node, 1);
        currentLayerMap.set(node.left, 0);

        // 更新 node 的 right
        node.right = new Node(this.idCount, node, 0);
        currentLayerMap.set(node.left, 0);

        currentLayerProfit[node.right.id] = 0;
        let parents = [];
        parents = findParent(node.right.parent, parents);
        let Sn = (1 - 0.618 ** parents.length) / (1 - 0.618);
        for (let x = 0; x < parents.length; x++) {
          let parent = parents[x];
          let parentShare = countShare(x, Sn);
          currentLayerProfit[parent.id] += parentShare;
        }
        this.idCount += 1;
        currentLayerMap.set(node.right, 0);
      } else {
        // 更新 node 本身
        // 更新 node 的 left
        node.mature = 1;

        node.left = new Node(node.id, node, 1);
        currentLayerMap.set(node.left, 0);
      }
    }

    this.layerObj["layer" + this.height] = currentLayerMap;
  }
}

const countShare = (n, Sn) => {
  return 0.618 ** n / Sn;
};

const findParent = (parent, parents) => {
  if (parent !== null) {
    parents.push(parent);
    return findParent(parent.parent, parents);
  } else {
    return parents;
  }
};

let tree = new Tree();
for (let x = 0; x < 5; x++) {
  tree.addLayer();
  if (x > 3) {
    console.log("layerProfit", tree.layerProfit);
  }
}

const btn = document.getElementById("btn");
btn.addEventListener("click", (e) => {
  e.preventDefault();
  let number = document.getElementById("input").value;

  let tree1 = new Tree();
  for (let x = 0; x < number; x++) {
    tree1.addLayer();
  }
  console.log(
    `layer ${number} profit of each node`,
    tree1.layerProfit[`layer${number}`]
  );
  document.getElementById("container").innerText =
    tree1.layerProfit[`layer${number}`];
});
