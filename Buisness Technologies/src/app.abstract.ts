// @ts-ignore
abstract class AApp {
	constructor() {
		this.inint();
	};
	
	private inint(): void {
		const body = document.querySelector('body');

		console.log("body")

		if (body) {
			body.appendChild(this.createMainPage());
		};
	};

	/**
	 * @description cоздание главной страницы, которая содержит в себе весь все созданные в проекте узлы
	 * @returns HTMLDivElement
	 */
	protected abstract createMainPage(): HTMLDivElement;

	/**
	 * @description метод для создания разных HTMLElements
   * @param {Object} options                
   * @param {string} options.tag            - название тэга
   * @param {Object} [options.attributs]    - массив атрибутов
   * @param {string[]} [options.classNames] - массив селекторов класса.
	 * @returns HTMLElement
	 */
	protected abstract createEl(
		{tag, attributs, classNames}: {tag: string, attributs?: {[key: string]: string}, classNames?: string[]}
	): HTMLElement

	/**
	 * @description создание поля для ввода
	 * @returns HTMLElement
	 */
	protected abstract entryField(): HTMLInputElement;

	/**
	 * @description таблица для отображения графика
	 * @returns HTMLDivElement
	 */
	protected abstract table(): HTMLDivElement;
};

module.exports = AApp;