import { Button, Form, Modal } from "react-bootstrap";
import ContactFormProspectService from "../../../../service/ContactFormProspectService";
import { ContactFormProspect } from "../../../../type/indexType";
import ToastFacade from "../../../../facade/ToastFacade";
//import PhotoCarouselService from "../../../../service/PhotoCarouselService";

interface ModalCreateContactFormProspectProps {
    isModalExportOpen: boolean,
    prospects: ContactFormProspect[],
    handleCloseExportModal: () => void
}

const ModalExportContactFormProspect: React.FC<ModalCreateContactFormProspectProps> = (
    {
        isModalExportOpen,
        handleCloseExportModal,
        prospects
    }
) => {
    const contactFromProspectService = ContactFormProspectService.getInstance();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const checkedProspectsString: string[] = formData.getAll('prospects').map(p => p.toString());
        const checkedFieldsString: string[] = formData.getAll('fields').map(p => p.toString());

        if(checkedProspectsString.length === 0 || checkedFieldsString.length === 0) {
            ToastFacade.showErrorToast('Veuillez choisir au moins un prospect et un champ.');
            return;
        }
        //console.log('prospects : ' + checkedProspectsString);
        //console.log('fields : ' + checkedFieldsString);
        await contactFromProspectService.exportProspects(checkedProspectsString, checkedFieldsString);
        //const result = await contactFromProspectService.createProspect(name, firstName, email, phone, comment);
        /*
        if(result.success) {
            console.log(result.message + ' ' + result.data);
            //await refreshList();
        }
        else {
            ToastFacade.showErrorToast(result.message ?? 'Une erreur est survenue lors de l\'exportation des prospects.');
        }
        */
        //await refreshList();
        handleCloseExportModal();
    };

    const fields = [
        "id", "name", "firstName", "email", "phone", "comment"
    ]

    return(
        <Modal 
                size="lg"
                className="modal-dark"
                show={isModalExportOpen} 
                onHide={handleCloseExportModal} 
                centered
        >
            <Modal.Header className="modal-dark-header">
                        <Modal.Title className="modal-dark-header-title"><span className="text-secondary">Exporter</span></Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-dark-body">
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formProspectsList">
                        <Form.Label className="text-medium-secondary">Liste des prospects</Form.Label>
                        <div className="d-flex flex-column align-items-start">
                            {prospects.map((prospect) => (
                            <Form.Check
                                key={prospect.id}
                                type="checkbox"
                                id={`prospect-checkbox-${prospect.id}`}
                                label={`${prospect.firstName} ${prospect.name}`}
                                value={prospect.id}
                                name="prospects"
                                className="mb-2 checkbox-dark"
                            />
                            ))}
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFieldsList">
                        <Form.Label className="text-medium-secondary">Liste des champs</Form.Label>
                        <div className="d-flex flex-column align-items-start">
                            {fields.map((field) => (
                            <Form.Check
                                key={field}
                                type="checkbox"
                                id={`field-checkbox-${field}`}
                                label={field}
                                value={field}
                                name="fields"
                                className="mb-2 checkbox-dark"
                            />
                            ))}
                        </div>    
                    </Form.Group>
                    <Button title="Exporter" className='button-dark-small no-border' type="submit" disabled={false}>
                        Exporter
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer className="modal-dark-footer">
                <button 
                    className="button-dark-small" 
                    onClick={handleCloseExportModal}
                >
                    Fermer
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalExportContactFormProspect;