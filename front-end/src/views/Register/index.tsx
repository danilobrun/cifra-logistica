import { useFormik } from "formik";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CustomButton } from "../../components/CustomButton";
import { FormField } from "../../components/FormField";
import { Layout } from "../../components/Layout";
import { PageTitle } from "../../components/PageTitle";
import * as yup from 'yup';

type FormValues = {
    name: string
    email: string
    phone: string
    password: string
    agree: boolean
}

export function RegisterView () {
    const formik = useFormik<FormValues>({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            password: '',
            agree: false
        },
        validationSchema: yup.object().shape({
            name: yup.string().required('Preencha seu nome.').min(5, 'Informe pelo menos 5 caractéres.'),
            email: yup.string().required('Preencha seu e-mail.').email('Preencha um e-mail válido.'),
            phone: yup.string().required('Preencha o telefone.'),
            password: yup.string().required('Preencha a senha.').min(8, 'Informe pelo menos 8 caractéres.').max(50, 'Informe no máximo 50 caractéres.'),
            agree: yup.boolean().equals([true], 'É preciso aceitar os termos.')
        }),
        onSubmit: (values) => {
            console.log('oi', values)
        }
    })
    const getFieldProps = (fieldName: keyof FormValues) => {
        return {
            ...formik.getFieldProps(fieldName),
            controlId: `input-${fieldName}`,
            error: formik.errors[fieldName],
            isInvalid: formik.touched[fieldName] && !!formik.errors[fieldName],
            isValid: formik.touched[fieldName] && !formik.errors[fieldName]
        }
    }
    return (
        <Layout>
            <Container>
                <Row className="justify-content-center">
                    <Col lg={4}>
                        <PageTitle>Nova Conta</PageTitle>
                        <Form onSubmit={formik.handleSubmit}>
                            <FormField
                                label="Nome"
                                placeholder="Digite aqui seu nome"
                                {...getFieldProps('name')}
                            />
                            <FormField
                                label="E-mail"
                                placeholder="Ele será seu ususário"
                                type="email"
                                {...getFieldProps('email')}
                            />
                            <FormField
                                label="Telefone"
                                placeholder="(00) 00000-0000"
                                {...getFieldProps('phone')}
                                mask={[
                                    { mask: '(00) 0000-0000' },
                                    { mask: '(00) 00000-0000' },
                                ]}
                                onAccept={value => formik.setFieldValue ('phone', value)}
                            />
                            <FormField
                                label="Senha"
                                placeholder="Informe sua senha de acesso"
                                {...getFieldProps('password')}
                                type="password"
                            />
                            <Form.Group className="mb-3" controlId="input-agree">
                                <Form.Check
                                    {...getFieldProps('agree')}
                                    type="checkbox"
                                    label={<>Eu li e aceito os <a href="/termos-de-uso.pdf" target="_blank">Termos de Uso.</a></>}
                                />
                                {formik.touched.agree && formik.errors.agree && (
                                    <Form.Control.Feedback type="invalid" className="d-block">
                                        {formik.errors.agree}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>
                            <div className="d-grid mb-4">
                                <CustomButton type="submit">
                                    Criar conta
                                </CustomButton>
                            </div>
                            <p className="text-center">Já possui contar?<br/> <Link to='/login'>Entrar</Link></p>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}