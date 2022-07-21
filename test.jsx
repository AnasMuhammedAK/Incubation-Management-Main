const handleSubmit = () => {
    if (!logo || formValues.name === '' || formValues.email === '' || formValues.address === '' || formValues.city === '' || formValues.state === '' || formValues.phoneno === '' || formValues.companyname === '' ||
        formValues.teamandbackground === '' || formValues.companyandproduct === '' || formValues.problem === '' || formValues.solution === '' || formValues.valueproposition === '' || formValues.competators === '' || formValues.revenue === '' ||
        formValues.potentialmarketsize === '' || formValues.plan === '' || formValues.type === '' || formValues.businessproposal === '') {
        setFormError('enter all the required fields')
    } else {
        const data = new FormData()
        console.log("qwerty")
        data.append("logo", logo)
        data.append("data", JSON.stringify(formValues))
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        axios.post(`${serverURL}/formSubmit/${user.id}`, data, config, token).then((response) => {
            console.log(response)
navigate('/processing')
        }).catch((err) => {
            console.log('error')
        })
    }
}