import { useEffect, useRef } from 'react';
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
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	isOpen: boolean;
	onToggle: () => void;
	onClose: () => void;
	formState: ArticleStateType;
	onFormChange: (newState: ArticleStateType) => void;
	onApply: () => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	isOpen,
	onToggle,
	onClose,
	formState,
	onFormChange,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const sidebarRef = useRef<HTMLDivElement>(null);

	// Обработчик клика вне сайдбара
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onClose]);

	// Обработчики изменения настроек
	const handleFontFamilyChange = (option: OptionType) => {
		onFormChange({ ...formState, fontFamilyOption: option });
	};

	const handleFontColorChange = (option: OptionType) => {
		onFormChange({ ...formState, fontColor: option });
	};

	const handleBackgroundColorChange = (option: OptionType) => {
		onFormChange({ ...formState, backgroundColor: option });
	};

	const handleContentWidthChange = (option: OptionType) => {
		onFormChange({ ...formState, contentWidth: option });
	};

	const handleFontSizeChange = (option: OptionType) => {
		onFormChange({ ...formState, fontSizeOption: option });
	};

	// Обработчики кнопок
	const handleApply = (e: React.FormEvent) => {
		e.preventDefault();
		onApply();
	};

	const handleReset = () => {
		onReset();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			<aside
				ref={sidebarRef}
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
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
