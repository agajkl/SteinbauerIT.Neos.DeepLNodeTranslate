import React, {Fragment, PureComponent} from 'react';
import manifest from '@neos-project/neos-ui-extensibility';
import {IconButton} from "@neos-project/react-ui-components";
import TranslateDialog from "./TranslateDialog";

manifest('SteinbauerIT.Neos.DeepLNodeTranslate:NodeTranslator', {}, (globalRegistry, {frontendConfiguration}) => {
	let guestFrameRegistry = globalRegistry.get('@neos-project/neos-ui-guest-frame');
	const nodeTypeConfiguration = frontendConfiguration['SteinbauerIT.Neos.DeepLNodeTranslate:NodeTypes'];
	const dimensions = frontendConfiguration['SteinbauerIT.Neos.DeepLNodeTranslate:Dimensions'];
	console.log(nodeTypeConfiguration)
	console.log(dimensions)
	console.log(globalRegistry)
	guestFrameRegistry.set('NodeToolbar/Buttons/DeepLTranslate', DeepLTranslate(nodeTypeConfiguration, dimensions));
});

const DeepLTranslate = (nodeTypeConfiguration, dimensions) => {
	return class deepLTranslate extends PureComponent {

		constructor(props) {
			super(props);
		}

		render() {

			return (
				<Fragment>
					<TranslateDialog nodeTypeConfiguration={nodeTypeConfiguration} dimensions={dimensions} />
				</Fragment>
			);
		}
	}
};
