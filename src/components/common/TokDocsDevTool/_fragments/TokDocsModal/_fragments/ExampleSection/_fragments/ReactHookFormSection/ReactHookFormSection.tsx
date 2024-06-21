import ReactHookFormSectionView from './ReactHookFormSection.view';
import useExampleForm from './_hooks/useExampleForm';

const ReactHookFormSection = () => {
  const formData = useExampleForm();
  const { handleSubmit } = formData;
  const onSubmit = handleSubmit(
    ({ username, email, phone, gender, fruit }) => {},
  );
  return <ReactHookFormSectionView formData={formData} onSubmit={onSubmit} />;
};

export default ReactHookFormSection;
