import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';

import styles from './App.module.scss';

export const App = () => {
	// Состояние для управления открытием/закрытием сайдбара
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	// Состояние статьи (примененные стили)
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	// Обработчик открытия/закрытия сайдбара
	const handleSidebarToggle = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	// Обработчик закрытия сайдбара при клике вне его
	const handleSidebarClose = () => {
		setIsSidebarOpen(false);
	};

	// Обработчик применения настроек из формы
	const handleApplySettings = (newState: ArticleStateType) => {
		setArticleState(newState);
		setIsSidebarOpen(false);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isSidebarOpen}
				onToggle={handleSidebarToggle}
				onClose={handleSidebarClose}
				onApply={handleApplySettings}
			/>
			<Article />
		</main>
	);
};
