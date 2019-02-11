const types = {
	stand: 1,
	hydralicPress: 100,
};
const save = {
	cash: 0,
	multipliers: [],
	helpers: Object.entries(types).map(d=>[d[0], 0]),
	...JSON.parse(localStorage.getItem("idler-save")),
};

let cps = 0;
function calcCPS() {
	const cps2 = 0;
	Object.entries(save.helpers).map(([ key, val ]) => {
		cps += types[key] * val;
	});
	return cps = cps2;
}
calcCPS();

setInterval(() => {
	save.cash += cps;
	render();
}, 750);

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
	}));

	ReactDOM.render(elem("div", {
		style: {
			textAlign: "center",
			userSelect: "none",
		},
	}, children), appDiv);
}
render();
