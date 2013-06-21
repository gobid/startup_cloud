#include <iostream>

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#include <curl/curl.h>
#include <curl/types.h>
#include <curl/easy.h>

using namespace std;

/* write_data
 * Cannibalized from http://www.cplusplus.com/forum/windows/36638/.
 */
static size_t write_data(void *ptr, size_t size, size_t nmemb, void *stream) {
	int written = fwrite(ptr, size, nmemb, (FILE *)stream);
	return written;
}

/* get_content
 * Gets the content of a given url.
 * Returns a FILE* 
 * Implementation cannibalized from http://www.cplusplus.com/forum/windows/36638/.
 */
FILE* get_content(char* url) {
	CURL *curl_handle;
	static const char *bodyfilename = url;
	FILE *bodyfile;
	curl_global_init(CURL_GLOBAL_ALL);
	curl_handle = curl_easy_init(); /* init the curl session */
	curl_easy_setopt(curl_handle, CURLOPT_URL, url);   /* set URL to get */  
	curl_easy_setopt(curl_handle, CURLOPT_FOLLOWLOCATION, 1);
	curl_easy_setopt(curl_handle, CURLOPT_NOPROGRESS, 1L); /* no progress meter please */ 
	curl_easy_setopt(curl_handle, CURLOPT_WRITEFUNCTION, write_data); /* send all data to this function  */  
	bodyfile = fopen(bodyfilename,"w");
	if (bodyfile == NULL) {
	curl_easy_cleanup(curl_handle);
	return -1;
	}  
	curl_easy_setopt(curl_handle, CURLOPT_WRITEDATA, bodyfile); /* we want the content to this file handle */
	/* Notice here that if you want the actual data sent anywhere else but
	* stdout, you should consider using the CURLOPT_WRITEDATA option. */
	curl_easy_perform(curl_handle); /* get it! */
	fclose(bodyfile); /* close the body file */
	curl_easy_cleanup(curl_handle);  /* cleanup curl stuff */
}

int main(void) {
	

  return 0;
}