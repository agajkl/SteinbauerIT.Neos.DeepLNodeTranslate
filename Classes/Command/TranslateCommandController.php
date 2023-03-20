<?php
namespace SteinbauerIT\Neos\DeepLNodeTranslate\Command;

use Neos\Flow\Annotations as Flow;
use Neos\Flow\Cli\CommandController;
use SteinbauerIT\Neos\DeepLNodeTranslate\Domain\Service\NodeService;

/**
 * @Flow\Scope("singleton")
 */
class TranslateCommandController extends CommandController
{

    /**
     * @Flow\Inject
     * @var NodeService
     */
    protected $nodeService;

    /**
     * @Flow\InjectConfiguration(package="SteinbauerIT.Neos.DeepLNodeTranslate", path="nodeTypes")
     * @var array
     */
    protected $nodeTypes = [];

    /**
     * Translate nodes (Only for test cases)
     *
     * @param string $nodeType
     * @param string $sourceDimensionKey
     * @param string $sourceDimension
     * @param string $targetDimensionKey
     * @param string $targetDimension
     * @return void
     */
    public function nodesCommand(string $nodeType, string $sourceDimensionKey, string $sourceDimension, string $targetDimensionKey, string $targetDimension)
    {
        $this->nodeService->translateNodes($nodeType, [$sourceDimensionKey => [$sourceDimension]], [$targetDimensionKey => [$targetDimension]]);
        $this->outputLine($nodeType . ' nodes translated from ' . $sourceDimension . ' to ' . $targetDimension);
    }

    /**
     * Translate allnodes (Only for test cases)
     *
     * @param string $sourceDimensionKey
     * @param string $sourceDimension
     * @param string $targetDimensionKey
     * @param string $targetDimension
     * @return void
     */
    public function allNodesCommand(string $sourceDimensionKey, string $sourceDimension, string $targetDimensionKey, string $targetDimension)
    {
        $nodeTypes = $this->nodeTypes;
        foreach ($nodeTypes as $nodeTypeKey => $nodeType) {
            $this->nodeService->translateNodes($nodeTypeKey, [$sourceDimensionKey => [$sourceDimension]], [$targetDimensionKey => [$targetDimension]]);
            $this->outputLine($nodeTypeKey . ' nodes translated from ' . $sourceDimension . ' to ' . $targetDimension);
        }
    }

}
