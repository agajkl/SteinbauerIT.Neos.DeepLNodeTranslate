import React, {Fragment, PureComponent, Component} from 'react';
import {
	Button,
	CheckBox,
	Dialog,
	IconButton,
	Label,
	SelectBox,
	TextArea,
	TextInput
} from "@neos-project/react-ui-components";
import {connect} from 'react-redux';
import {selectors, actions} from '@neos-project/neos-ui-redux-store';
import {$transform} from 'plow-js';
import {neos} from '@neos-project/neos-ui-decorators';

@connect($transform({
	siteNodeSelector: selectors.CR.Nodes.siteNodeSelector,
	focusedNodeIdentifier: selectors.CR.Nodes.focusedNodeIdentifierSelector,
	node: selectors.CR.Nodes.focusedSelector
}))
@neos(globalRegistry => ({
	i18nRegistry: globalRegistry.get('i18n')
}))
export default class TranslateDialog extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showDialog: false,
			source: false,
			target: false,
			submit: false,
			result: false,
		}
		this.toggleDialog = this.toggleDialog.bind(this);
		this.setSource = this.setSource.bind(this);
		this.setTarget = this.setTarget.bind(this);
		this.submit = this.submit.bind(this);
	}

	resetState() {
		this.setState({
			source: false,
			target: false,
			submit: false,
			result: false
		});
	}

	toggleDialog() {
		this.setState(prevState => ({
			showDialog: !prevState.showDialog
		}), () => {
			this.resetState();
		});
	}

	setSource(value) {
		this.setState({source: value}, () => {
			console.log(this.state.source)
		});
	}

	setTarget(value) {
		this.setState({target: value}, () => {
			console.log(this.state.target)
		});
	}

	submit() {
		this.setState({submit: true}, () => {
			const {source, target} = this.state;
			const {node, dimensions, focusedNodeIdentifier} = this.props;
			const nodeType = node.nodeType;

			const getDimension = (objectValues, key) => {
				let index = 0;
				return objectValues.reduce((result, obj, i) => {
					if (index !== -1) {
						result[Object.keys(dimensions)[i]] = { [index]: key };
						index = index + 1;
					}
					return result;
				}, {});
			};

			const sourceDimension = getDimension(Object.values(dimensions), source);
			const targetDimension = getDimension(Object.values(dimensions), target);

			const formData = new FormData();
			formData.append('nodeType', nodeType);
			formData.append('source', JSON.stringify(sourceDimension));
			formData.append('target', JSON.stringify(targetDimension));
			formData.append('nodeIdentifier', focusedNodeIdentifier);

			fetch('/neos/api/deepl/translate', {method: 'POST', body: formData, redirect: 'follow'})
				.then(response => response.json())
				.then(result => {
					console.log(result)
					this.setState({submit: false}, () => {
						this.setState({result: result});
					});
				})
				.catch(error => console.log('error', error));
		});
	}

	render() {

		const {showDialog, source, target, submit, result} = this.state;
		const {nodeTypeConfiguration, dimensions, node} = this.props;

		const isInArray = () => {
			for(let i in nodeTypeConfiguration) {
				if(i === node.nodeType) {
					return true;
				}
			}
			return false;
		}

		return (
			<Fragment>
				{isInArray() &&
					<IconButton icon="fas fa-language" onClick={() => this.toggleDialog()} />
				}
				{showDialog &&
					<Dialog
						title={submit ? 'Translate ...' : 'DeepL Node Translate'}
						isOpen={showDialog}
						onRequestClose={() => this.toggleDialog()}
						id="neos-deeplTranslate"
						actions={[
							<Fragment>
								{!submit && !result &&
									<Button type="button" style="success" hoverStyle="success" onClick={() => this.submit()} >
										Start translation
									</Button>
								}
								<div style={{display: 'inline-block', marginLeft: '1px'}}>
									<Button type="button" style="neutral" hoverStyle="brand" onClick={() => this.toggleDialog()} >
										{!submit && result ? 'Close' : 'Cancel'}
									</Button>
								</div>
							</Fragment>
						]}>
						<Fragment>
							<div style={{padding: '16px'}}>
								{!submit && !result &&
									<Fragment>
										<div style={{marginBottom: '30px'}}>
											<TranslateDialogSelect title="Source" dimensions={dimensions} value={source} setValue={(p) => this.setSource(p)} />
										</div>
										<TranslateDialogSelect title="Target" dimensions={dimensions} value={target} setValue={(p) => this.setTarget(p)} />
									</Fragment>
								}
								{!submit && result &&
									<Fragment>
										Translation successful.
									</Fragment>
								}
							</div>
						</Fragment>
					</Dialog>
				}
			</Fragment>
		);
	}
}

class TranslateDialogSelect extends Component {

	render() {

		const {title, dimensions, setValue, value} = this.props;

		const toArray = (objectValues) => {
			let result = [];
			let count = 0;
			for(let i in objectValues) {
				result[count] = {
					label: objectValues[i].label,
					value: i
				}
				count = count + 1;
			}
			return result;
		}

		return (
			<Fragment>
				<h3 style={{margin:0, marginBottom: '20px', padding:0}}>{title}</h3>
				{Object.keys(dimensions).map((dimension, i) =>
					<Fragment>
						<legend style={{marginBottom: '10px'}}>{Object.values(dimensions)[i].label}</legend>
						<SelectBox name={`source[${i}][]`} placeholder={`Choose ${Object.values(dimensions)[i].label}`} options={toArray(Object.values(dimensions)[i].presets)} value={value} onValueChange={(p) => setValue(p)} />
					</Fragment>
				)}
			</Fragment>
		);
	}
}
