import React, {Fragment, Component, useState} from 'react';
import {Button, Dialog, Label, SelectBox} from "@neos-project/react-ui-components";
import {connect} from 'react-redux';
import {selectors, actions} from '@neos-project/neos-ui-redux-store';
import {$transform} from 'plow-js';
// import {neos} from '@neos-project/neos-ui-decorators';
// import {
// 	findNodeInGuestFrame,
// } from '@neos-project/neos-ui-guest-frame';
import styles from "./styles.css";

@connect($transform({
	siteNodeSelector: selectors.CR.Nodes.siteNodeSelector,
	focusedNodeIdentifier: selectors.CR.Nodes.focusedNodeIdentifierSelector,
	focusedSelector: selectors.CR.Nodes.focusedSelector
}))
class TranslateView extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const {focusedNodeIdentifier, viewRegistry} = this.props;

		const view = viewRegistry.get('SteinbauerIT.Neos.DeepLNodeTranslate/Inspector/Views/TranslateView');
		const configuration = view.configuration;

		return <View focusedNodeIdentifier={focusedNodeIdentifier} configuration={configuration} />
	}
}

export default TranslateView;

const View = (props) => {

	const defaultStatusText = 'Please wait until the translation has been completed.';

	const [source, setSource] = useState(false);
	const [sourceKey, setSourceKey] = useState(false);
	const [target, setTarget] = useState(false);
	const [targetKey, setTargetKey] = useState(false);
	const [showDialog, setShowDialog] = useState(false);
	const [statusText, setStatusText] = useState(defaultStatusText);

	const {focusedNodeIdentifier, configuration} = props;

	const handleChange = (type, key, value) => {
		if(type === 'source') {
			setSource(value)
			setSourceKey(key)
		}
		if(type === 'target') {
			setTarget(value)
			setTargetKey(key)
		}
	}

	const handleClick = () => {
		setShowDialog(true);

		const formData = new FormData();
		formData.append('nodeIdentifier', focusedNodeIdentifier);
		formData.append('sourceDimensionKey', sourceKey);
		formData.append('sourceDimension', source);
		formData.append('targetDimensionKey', targetKey);
		formData.append('targetDimension', target);

		fetch(`/neos/api/deepl/translatenodeandtheirchildrenbyidentifier`, {method: 'POST', redirect: 'follow', body: formData, credentials: 'include'})
			.then((response) => response.json())
			.then((result) => {
				if(result) {
					setStatusText('The content has been translated');
					setTimeout(() => {
						setShowDialog(false)
						setStatusText(defaultStatusText);
						setTarget(false);
					}, 2000)
				}
			})
			.catch((error) => console.error(error));
	}

	return (
		<Fragment>

			<Dialog title="Translate ..."
				isOpen={showDialog}
				onRequestClose={() => {}}
				id="neos-TranslateDialog"
				>
				<div style={{padding: '16px'}}>
					{statusText}
				</div>
			</Dialog>

			{configuration.sourceDimensionKeys.map(sourceDimensionKey =>
				<div style={{marginTop: '10px'}} >
					<Label>Source: {sourceDimensionKey}</Label>
					<SelectBox options={configuration.sourceDimensions[sourceDimensionKey].map(item => { return {label: item, value: item} })} value={source ? source : ''} onValueChange={(p) => handleChange('source', sourceDimensionKey, p)} />
				</div>
			)}

			{configuration.sourceDimensionKeys.map(targetDimensionKey =>
				<div>
					<Label>Target: {targetDimensionKey}</Label>
					<SelectBox options={configuration.targetDimensions[targetDimensionKey].map(item => { return {label: item, value: item} })} value={target ? target : ''} onValueChange={(p) => handleChange('target', targetDimensionKey, p)} />
				</div>
			)}

			<Button style="brand" hoverStyle="brand" className={styles.translateButton} onClick={() => handleClick()}>Translate content</Button>
		</Fragment>
	)
}
