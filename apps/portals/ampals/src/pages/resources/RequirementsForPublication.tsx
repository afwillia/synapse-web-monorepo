import AMPALSResearchPageLayout from '@sage-bionetworks/synapse-portal-framework/components/ampals/AMPALSResearchPageLayout'
import publishingRequirementsSlat from '@/assets/publishing_requirements.png'
import { MarkdownSynapse } from 'synapse-react-client/components/Markdown/MarkdownSynapse'

function RequirementsForPublication() {
  return (
    <AMPALSResearchPageLayout
      headerTitle="Requirements for Publication"
      headerImageURL={publishingRequirementsSlat}
      sidebarTitle="Using data from the ALS Knowledge Portal in publications"
    >
      <MarkdownSynapse
        ownerId="syn64892175"
        wikiId="632170"
        loadingSkeletonRowCount={50}
      />
    </AMPALSResearchPageLayout>
  )
}

export default RequirementsForPublication
