import { useRef, useState } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
	OptionType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { useClose } from './hooks';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	isOpen: boolean;
	onToggle: () => void;
	onClose: () => void;
	onApply: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	isOpen,
	onToggle,
	onClose,
	onApply,
}: ArticleParamsFormProps) => {
	const sidebarRef = useRef<HTMLDivElement>(null);

	// Состояние формы (временные настройки)
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	// Используем кастомный хук для закрытия
	useClose({
		isOpen,
		onClose,
		rootRef: sidebarRef,
	});

	// Обработчики изменения настроек
	const handleFontFamilyChange = (option: OptionType) => {
		setFormState({ ...formState, fontFamilyOption: option });
	};

	const handleFontColorChange = (option: OptionType) => {
		setFormState({ ...formState, fontColor: option });
	};

	const handleBackgroundColorChange = (option: OptionType) => {
		setFormState({ ...formState, backgroundColor: option });
	};

	const handleContentWidthChange = (option: OptionType) => {
		setFormState({ ...formState, contentWidth: option });
	};

	const handleFontSizeChange = (option: OptionType) => {
		setFormState({ ...formState, fontSizeOption: option });
	};

	// Обработчики кнопок
	const handleApply = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form} onSubmit={handleApply}>
					<Text
						as='h3'
						size={31}
						weight={800}
						uppercase
						align='left'
						family='open-sans'>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFontFamilyChange}
						placeholder='Выберите шрифт'
					/>

					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleFontSizeChange}
					/>

					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleFontColorChange}
						placeholder='Выберите цвет'
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleBackgroundColorChange}
						placeholder='Выберите цвет'
					/>

					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleContentWidthChange}
						placeholder='Выберите ширину'
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
