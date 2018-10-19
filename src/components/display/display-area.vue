<template>
    <div class="inner">
        <div width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #222222;">
            <center style="width: 100%; background-color: #222222;" class="initial-display" data-state="drop">
            <!--[if mso | IE]>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #222222;">
            <tr>
            <td>
            <![endif]-->

                <!-- Visually Hidden Preheader Text : BEGIN -->
                <div contenteditable="true" style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
                    (Optional) This text will appear in the inbox preview, but not the email body. It can be used to supplement the email subject line or even summarize the email's contents. Extended text preheaders (~490 characters) seems like a better UX for anyone using a screenreader or voice-command apps like Siri to dictate the contents of an email. If this text is not included, email clients will automatically populate it using the text (including image alt text) at the start of the email's body.
                </div>
                <!-- Visually Hidden Preheader Text : END -->

                <!-- Create white space after the desired preview text so email clients don’t pull other distracting text into the inbox preview. Extend as necessary. -->
                <!-- Preview Text Spacing Hack : BEGIN -->
                <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
                    &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
                </div>
                <!-- Preview Text Spacing Hack : END -->

                <!-- Email Body -->
                <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto;" class="email-container">
                </table>
                <!-- Email Body : END -->

            <!--[if mso | IE]>
            </td>
            </tr>
            </table>
            <![endif]-->
            </center>
        </div>
    </div>
</template>

<script>
	export default {
		data () {
			return {
				
			}
		}
	}
</script>

<style lang="scss">
#displayarea
{
	position: relative;
	background-color: #222222;

	.inner {
		margin: 0 auto;
		overflow: scroll;
		height: 100%;
		position: relative;
		padding: 15px;
		display: flex;
		flex-flow: column;

		& > * {
			flex: 1 1 100%;
		}
	}

	*[data-state="drop"]
	{
		color: #fff;
		position: relative;
		min-height: 100%;
		padding-top: 30px;
		padding-bottom: 30px;

		&.highlight {
			outline: 4px dashed rgba(100,100,100,.8);
		}

		*[data-state="drag"] {
			margin-bottom: 0;
		}
	}

	.block
	{
  		position: relative;

		&:hover 
		{
			outline: 3px solid rgba(75,75,200,.8);

			& .block-controls {
				display: inline-block;
			}
		}

		*[data-append="before"]
		{
			height: 10px;
			width: 100%;
			position: absolute;
			top: 0;
		}

		*[data-append="after"]
		{
			height: 10px;
			width: 100%;
			position: absolute;
			bottom: 0;
		}

		*[data-append].highlight {
			background: rgba(75,75,200,.8);
		}

		.block-controls {
			display: none;
			background: rgba(0,0,0,.9);
			border-radius: 15px;
			position: absolute;
			transform: translateY(-50%);
		}

		@mixin blockControls() {
			display: inline-block;
			text-align: center;
			padding: 15px;
			outline: 0px solid rgba(0,0,0,.6);
			transform: scale(1);
			transition: 0.2s all;
			z-index: 2;

			&:hover {
				cursor: pointer;
				// outline-width: 2px;
				// transform: scale(1.3);
			}

			&:before {
				content: attr(data-method);
			}
		}

		div[data-method="move"]
		{
			@include blockControls();

			&:hover {
				cursor: move;
			}
		}

		div[data-method="edit"]
		{
			@include blockControls();
			&:hover {
				cursor: text;
			}
		}

		div[data-method="delete"]
		{
			@include blockControls();
			&:hover {
				cursor: no-drop;
			}
		}
  }

	&.mobile {
		min-width: 350px !important;

		.email-container {
			width: 100% !important;
			margin: auto !important;
		}

		/* What it does: Forces elements to resize to the full width of their container. Useful for resizing images beyond their max-width. */
		.fluid {
			max-width: 100% !important;
			height: auto !important;
			margin-left: auto !important;
			margin-right: auto !important;
		}

		/* What it does: Forces table cells into full-width rows. */
		.stack-column,
		.stack-column-center {
			display: block !important;
			width: 100% !important;
			max-width: 100% !important;
			direction: ltr !important;
		}

		/* And center justify these ones. */
		.stack-column-center {
			text-align: center !important;
		}

		/* What it does: Generic utility class for centering. Useful for images, buttons, and nested tables. */
		.center-on-narrow {
			text-align: center !important;
			display: block !important;
			margin-left: auto !important;
			margin-right: auto !important;
			float: none !important;
		}

		table.center-on-narrow {
			display: inline-block !important;
		}

		/* What it does: Adjust typography on small screens to improve readability */
		.email-container p {
			font-size: 17px !important;
		}
	}
}
</style>