import manifest from '@neos-project/neos-ui-extensibility';
import TranslateView from "./TranslateView";

manifest('inspectorViews', {}, (globalRegistry, {frontendConfiguration}) => {
	const viewsRegistry = globalRegistry.get('inspector').get('views');

	const configuration = frontendConfiguration['SteinbauerIT.Neos.DeepLNodeTranslate:Configuration'];

	viewsRegistry.set('SteinbauerIT.Neos.DeepLNodeTranslate/Inspector/Views/TranslateView', {
		component: TranslateView,
		configuration: configuration
	});
});
