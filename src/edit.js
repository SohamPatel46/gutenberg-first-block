/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps, RichText, InnerBlocks, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';

/**
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/text-control/
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/toggle-control/
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/panel/#panelbody
 */
import {  TextControl, ToggleControl, PanelBody, ColorPalette } from '@wordpress/components'

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes }) {

	const { message, message2, showMessage, textColor, alignment } = attributes;

	const onChangeToggleField = ( value ) => setAttributes( { showMessage: value } ); //onChangeToggleField

	const ALLOWED_BLOCKS =[ 'core/button' ];

	return (
		<>
			<div { ...useBlockProps() }>
				<InspectorControls style={ { marginBottom: '20px' } }>
					<PanelBody title={ __( 'Another text settings', 'sp-first' ) }>
						<ToggleControl
							label={ __(
								'Show another custom text ?',
								'sp-first'
							) }
							checked={ showMessage }
							onChange={ onChangeToggleField }
						/>
						<TextControl
							label={ __(
								'Another custom text',
								'sp-first'
							) }
							value={ message2 || '' }
							onChange={ ( value ) =>
								setAttributes( { message2: value } )
							}
						/>
						<ColorPalette 
							label={ __( 'Text Color', 'sp-first' ) }
							value={ textColor }
							onChange={ ( value ) => setAttributes( { textColor: value } ) }
						/>
					</PanelBody>
				</InspectorControls>

				<div className="sp-wrapper">
					{ ( 
						<BlockControls>
							<AlignmentToolbar 
								value={ alignment } 
								onChange={ ( value) => { setAttributes ( { alignment: value } ) } } />
						</BlockControls>
					) }
					<RichText
						tagName="h2"
						className="sp-message"
						value={ message }
						onChange={ ( message ) => { setAttributes( { message: message } ) } }
						placeholder={ __( 'Enter Message', 'sp-first' ) }
						style={ { textAlign: alignment } }
					/>

					{	showMessage && (
						<h3 style={ { color: textColor, textAlign: alignment } }>{ message2 }</h3>
					) }

					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
					/>
				</div>
			</div>
		</>
	);
}
