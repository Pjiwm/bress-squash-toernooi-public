export = async function (password) {
	if (password >= 8 && password.contains(Number)) {
		return true
	}
	return false
}