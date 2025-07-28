import { Button, Form, Modal } from "react-bootstrap";
import ContactFormProspectService from "../../../../service/ContactFormProspectService";
import FileService from "../../../../service/FileService";
import { ApiResponse, ContactFormProspect } from "../../../../type/indexType";
import ToastFacade from "../../../../facade/ToastFacade";
import { useRef, useState } from "react";

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
    const [checkedProspects, setCheckedProspects] = useState<string[]>([]);
    const [checkedFields, setCheckedFields] = useState<string[]>([]);

    const contactFromProspectService = ContactFormProspectService.getInstance();
    const fileService = FileService.getInstance();

    const fields = [
        "id", "name", "firstName", "email", "phone", "comment"
    ];

    const fileNameRef = useRef<string>("");
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (checkedProspects.length === 0 || checkedFields.length === 0 || fileNameRef.current === "") {
            ToastFacade.showErrorToast('Veuillez choisir au moins un prospect, un champ et un nom de fichier.');
            return;
        }

        const result: ApiResponse = await contactFromProspectService.exportProspects(checkedProspects, checkedFields);
        await fileService.exportCsvFile(result.data, fileNameRef.current);
        handleCloseExportModal();
    };


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
                    <Form.Group className="mb-4" controlId="formFileName">
                        <Form.Label className="text-medium-secondary">Nom du fichier</Form.Label>
                        <Form.Control
                            type="text"
                            className='edit-slide-form-field'
                            placeholder="Saisir un nom de fichier (sans l'extension)"
                            defaultValue={fileNameRef.current}
                            onChange={(e) => fileNameRef.current = e.target.value}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formProspectsList">
                        <Form.Label className="text-medium-secondary">Liste des prospects</Form.Label>
                            <div className="mb-2">
                            <Button
                                //="sm"
                                //variant="secondary"
                                title="Cocher tous les prospects"
                                className="button-dark-small me-2"
                                onClick={() => setCheckedProspects(prospects.map(p => p.id.toString()))}
                            >
                                Tout cocher
                            </Button>
                            <Button
                                //size="sm"
                                //variant="secondary"
                                title="Décocher tous les prospects"
                                className="button-dark-small me-2"
                                onClick={() => setCheckedProspects([])}
                            >
                                Tout décocher
                            </Button>
                        </div>

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
                                checked={checkedProspects.includes(prospect.id.toString())}
                                onChange={e => {
                                    const id = prospect.id.toString();
                                    setCheckedProspects(e.target.checked
                                    ? [...checkedProspects, id]
                                    : checkedProspects.filter(pid => pid !== id)
                                    );
                                }}
                            />

                            ))}
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFieldsList">
                        <Form.Label className="text-medium-secondary">Liste des champs</Form.Label>
                        <div className="mb-2">
                            <Button
                                //size="sm"
                                title="Cocher tous les champs"
                                className="button-dark-small me-2"
                                onClick={() => setCheckedFields(fields)}
                            >
                                Tout cocher
                            </Button>
                            <Button
                                //size="sm"
                                //variant="secondary"
                                title="Décocher tous les champs"
                                className="button-dark-small me-2"
                                onClick={() => setCheckedFields([])}
                            >
                                Tout décocher
                            </Button>
                        </div>

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
                                checked={checkedFields.includes(field)}
                                onChange={e => {
                                    setCheckedFields(e.target.checked
                                    ? [...checkedFields, field]
                                    : checkedFields.filter(f => f !== field)
                                    );
                                }}
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