// @ts-ignore
const AApp =  require("./app.abstract");

// @ts-ignore
class App extends AApp {

	private valueOfInput: string = '';

	protected createEl(
		{tag, attributs, classNames}: {tag: string, attributs?: {[key: string]: string}, classNames?: string[]} // типы прописаны в абстрактном классе
	) {
	 const createTag: HTMLElement = document.createElement(tag);

	 if (attributs !== undefined) {
		for (let attr in attributs) {
		  createTag.setAttribute(attr, attributs[attr]);
		};
	 };

	 if (classNames !== undefined) {
		while (classNames.length > 0) {
			const deletedClassName = classNames.shift() as string;
			createTag.classList.add(deletedClassName);
		};
	 };

	 return createTag;
	};

	protected createMainPage() {
		const main = this.createEl({
			tag: "div",
			classNames: ['main_page']
		}) as HTMLDivElement;

		main.appendChild(this.entryField());
		main.appendChild(this.btnGetGetDiagram());
		main.appendChild(this.table());

		return main;
	};

	protected entryField() {
		const self = this;

		const placeForText = self.createEl({
			tag: "input",
			attributs: {
				value: '',
				placeholder: 'введите текст'
			},
			classNames: ['input']
		}) as HTMLInputElement;

		placeForText.oninput = (e: any)=> {
			this.valueOfInput = e.target.value;

		};

		return placeForText;
	};

	private createDiagram(): any {

		if (this.valueOfInput) {

			const str: string[] = this.valueOfInput.split(/(\(|\d+|\))/).filter(Boolean).filter((el: string) => el !== " ");

			const place = {
				rows: 0,
				column: 0,
				symbols: []
			};

			const symboldForTable: string[][] = [];

			let numberOnLine = 0;
			let pointString  = undefined;
			let numberColumn = 0;

			for (let strEl of str) {

				if (!!Number(strEl)) {
					place.rows  += 1;

					if (pointString === undefined) {
						pointString = 0
					} else {
						pointString +=1;
					};

					symboldForTable.push([]);

					for (let i = 2; i <= numberOnLine; i++) {
						symboldForTable[pointString].push(" ");
					};

					symboldForTable[pointString].push(strEl);


				 /**** логика для горизонтальной черты между цифрами *************/
					const lengthChildSFT = symboldForTable[pointString].length;
					
					const lengthChildSFTMinusOne = lengthChildSFT - 1;

					for (let prevRow of symboldForTable) {
						if (!!prevRow && prevRow[lengthChildSFTMinusOne] === " ") {
							prevRow[lengthChildSFTMinusOne] = "|";
						};
					};
				 /****************************************************************/

				} else if (strEl === '(') {
					numberColumn += 1;

					numberOnLine += 1;

					if (pointString !== undefined) {
						symboldForTable[pointString].push("-", "+");
						numberOnLine +=1;
					};

				} else if (strEl === ')') {
					numberColumn -= 1;

					numberOnLine -= 2;
				};
				
				if (numberColumn > place.column) {
					place.column = numberColumn;
				};
			};

			place.column = place.column * 2 - 1; // для учета пробела между цифрами 

			const divContainDiagram = this.createEl({tag:'div'}) as HTMLDivElement;
			for (let i = 0; i < symboldForTable.length; i++) {

				const createdEl = this.createEl({tag:'div', classNames: ['line']}) as HTMLDivElement;

				for (let j = 0; j < symboldForTable[i].length; j++) {

					const classNames = [];
					let textContent  = " ";

					switch (symboldForTable[i][j]) {
						case '-':
							classNames.push('h_hyphen');
							break;
						case '|':
							classNames.push('v_hyphen');
							break;
						case '+':
							classNames.push('arrow');
							break;
						default:
							textContent = symboldForTable[i][j];
							break;
					};

					const createdChildEl = this.createEl({tag:'div', classNames});
					createdChildEl.textContent = textContent;

					createdEl.append(createdChildEl);
				};

				divContainDiagram.append(createdEl);
			};


			return divContainDiagram;
		};
	};

	private renderDiagram() {
		const table = document.querySelector(".table") as HTMLDivElement;
		table.innerHTML = '';
		table.append(this.createDiagram());
	};

	private btnGetGetDiagram(): HTMLButtonElement {
		const btn = this.createEl({tag: 'button', classNames: ['button']}) as HTMLButtonElement;
		btn.textContent = "Отрисовать";
		btn.onclick     = this.renderDiagram.bind(this);

		return btn;
	};

	protected table() {
		const table = this.createEl({
			tag: "div",
			classNames: ['table']
		}) as HTMLDivElement;

		return table;
	};
};

module.exports = App;