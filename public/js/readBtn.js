function handleReadNowButtonClick(bookId) {
    checkTokenAndRedirectToLogin();
    
    window.open("/read/" + bookId, "_blank");
}
