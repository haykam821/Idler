const types = {
	stand: [30, 1],
	hydralicPress: [250, 100],
	factory: [120000, 100000],
};
const save = {
	cash: 0,
	multipliers: [],
	helpers: {},
	...JSON.parse(localStorage.getItem("idler-save")),
};

Object.keys(types).forEach(type => {
	if (!save.helpers[type]) {
		save.helpers[type] = 0;
	}
});

const appDiv = document.getElementById("app");
const elem = React.createElement;

class Stat extends React.Component {
	render() {
		return elem("p", {
			style: {
				color: "white",
				backgroundColor: this.props.bg || "green",
				padding: 10,
				borderRadius: 8,
				fontWeight: "bold",
			},
		}, this.props.data);
	}
}

let cps = 0;
function calcCPS() {
	let cps2 = 0;
	Object.entries(save.helpers).map(([ key, val ]) => {
		cps2 += types[key][1] * val;
	});
	render();
	return cps = cps2;
}
calcCPS();

setInterval(() => {
	save.cash += cps;
	render();
}, 750);

function render() {
	localStorage.setItem("idler-save", JSON.stringify(save));

	const children = [];

	children.push(elem(Stat, {
		data: "Cash: $" + save.cash.toLocaleString(),	
	}));

	children.push(elem(Stat, {
		data: "CPS: " + cps.toLocaleString(),	
	}));

	children.push(elem("button", {
		onClick: () => {
			save.cash += 1;
			render();
		},
		children: "Click"
	}))

	children.push(elem("div", {
		display: "flex",
		style: {
			padding: 10,
			justifyContent: "space-evenly",
		},
		children: Object.entries(types).map(([type, [cost, cpsAdd]]) => {
			return elem("button", {
				style: {
					margin: 6,
					border: "none",
					background: save.cash >= cost ? "#76ff03" : "red",
					padding: 10,
					borderRadius: 8,
					flexGrow: 1,
				},
				onClick: () => {
					if (save.cash >= cost) {
						save.cash -= cost;
						save.helpers[type] += 1;
						calcCPS();
					}
				}
			}, type + " (+" + cpsAdd + " cps)");
		}),
	}));

	ReactDOM.render(elem("div", {
		style: {
			textAlign: "center",
			userSelect: "none",
		},
	}, children), appDiv);
}
render();
