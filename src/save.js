/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { RichText } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function Save( { attributes } ) {
	const { message, message2, showMessage, textColor, alignment } = attributes;

	return (
		<>
			<div { ...useBlockProps.save() }>
				<div className="sp-wrapper">
					<RichText.Content
						tagName="h2"
						className="sp-message"
						value={ message }
						style={ { textAlign: alignment } }
					/>
					{	showMessage && (
						<h3 style={ { color: textColor, textAlign: alignment } }>{ message2 }</h3>
					) }
					<InnerBlocks.Content/>
				</div>
			</div>
		</>
	);
}
