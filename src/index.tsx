import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// Состояние для управления открытием/закрытием сайдбара
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	// Состояние статьи (примененные стили)
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	// Состояние формы (временные настройки)
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	// Обработчик открытия/закрытия сайдбара
	const handleSidebarToggle = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	// Обработчик закрытия сайдбара при клике вне его
	const handleSidebarClose = () => {
		setIsSidebarOpen(false);
	};

	// Обработчик применения настроек
	const handleApplySettings = () => {
		setArticleState(formState);
		setIsSidebarOpen(false);
	};

	// Обработчик сброса настроек
	const handleResetSettings = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
		setIsSidebarOpen(false);
	};

	// Обработчик изменения настроек в форме
	const handleFormChange = (newState: ArticleStateType) => {
		setFormState(newState);
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
				formState={formState}
				onFormChange={handleFormChange}
				onApply={handleApplySettings}
				onReset={handleResetSettings}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
