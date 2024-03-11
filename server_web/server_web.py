import socket
import os # pentru dimensiunea fisierului
import json
from urllib.parse import unquote

# creeaza un server socket
serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
#serversocket.setsockopt(socket.SOL_SOCKET, socket.SO_RCVBUF, 10000000)
# specifica ca serverul va rula pe portul 5678, accesibil de pe orice ip al serverului
serversocket.bind(('', 5678))
# serverul poate accepta conexiuni; specifica cati clienti pot astepta la coada
serversocket.listen(5)

while True:
	print('#########################################################################')
	print('Serverul asculta potentiali clienti.')
	# asteapta conectarea unui client la server
	# metoda `accept` este blocanta => clientsocket, care reprezinta socket-ul corespunzator clientului conectat
	(clientsocket, address) = serversocket.accept()
	print('S-a conectat un client.')
	# se proceseaza cererea si se citeste prima linie de text
	cerere = ''
	linieDeStart = ''
	while True:
		buf = clientsocket.recv(2048)
		if len(buf) < 1:
			break
		cerere = cerere + buf.decode()
		print('S-a citit mesajul: \n---------------------------\n' + cerere + '\n---------------------------')
		pozitie = cerere.find('\r\n')
		if (pozitie > -1 and linieDeStart == ''):
			linieDeStart = cerere[0:pozitie]
			print ('S-a citit linia de start din cerere: ##### ' + linieDeStart + ' #####')
			break
	print('S-a terminat cititrea.')
	if linieDeStart == '':
		clientsocket.close()
		print('S-a terminat comunicarea cu clientul - nu s-a primit niciun mesaj.')
		continue
	# interpretarea sirului de caractere `linieDeStart`
	elementeLineDeStart = linieDeStart.split()
	# TODO securizare
	numeResursaCeruta = elementeLineDeStart[1]

	if numeResursaCeruta == '/api/utilizatori':
		dummy = cerere.split('\r\n')
		reqContent = unquote(dummy[len(dummy)-1])
		elements = reqContent.split('&')
		pyDict = {}
		for el in elements:
			print(el)
			aux = el.split('=')
			print(aux)
			pyDict.update({aux[0]: aux[1]})

		with open("../continut/resurse/utilizatori.json", "r") as file:
			data = json.load(file)
			
		data.append(pyDict)

		with open("../continut/resurse/utilizatori.json", "w") as file:
			json.dump(data, file)
		
		message = "Client inregistrat!"
		clientsocket.sendall(bytes('HTTP/1.1 200 OK\r\n', 'UTF-8'))
		clientsocket.sendall(bytes('Content-Length: ' + str(len(message)) + '\r\n', 'UTF-8'))
		clientsocket.sendall(bytes('Content-Type: text/plain\r\n', 'UTF-8'))
		clientsocket.sendall(bytes('Server: My PW Server\r\n', 'UTF-8'))
		clientsocket.sendall(bytes('\r\n', 'UTF-8'))
		clientsocket.sendall(bytes(message, 'UTF-8'))

		clientsocket.close()
		print('S-a terminat comunicarea cu clientul.')

	else:

		if numeResursaCeruta == '/':
			numeResursaCeruta = '/index.html'
		
		numeFisier = '../continut' + numeResursaCeruta
		
		fisier = None
		try:
			fisier = open(numeFisier,'rb')

			numeExtensie = numeFisier[numeFisier.rfind('.')+1:]
			tipuriMedia = {
				'html': 'text/html; charset=utf-8',
				'css': 'text/css; charset=utf-',
				'js': 'text/javascript; charset=utf-8',
				'png': 'image/png',
				'jpg': 'image/jpeg',
				'jpeg': 'image/jpeg',
				'gif': 'image/gif',
				'ico': 'image/x-icon',
				'xml': 'application/xml; charset=utf-8',
				'json': 'application/json; charset=utf-8'
			}
			tipMedia = tipuriMedia.get(numeExtensie,'text/plain; charset=utf-8')
			
			clientsocket.sendall(bytes('HTTP/1.1 200 OK\r\n', 'UTF-8'))
			clientsocket.sendall(bytes('Content-Length: ' + str(os.stat(numeFisier).st_size) + '\r\n', 'UTF-8'))
			clientsocket.sendall(bytes('Content-Type: ' + tipMedia +'\r\n', 'UTF-8'))
			clientsocket.sendall(bytes('Server: My PW Server\r\n', 'UTF-8'))
			clientsocket.sendall(bytes('\r\n', 'UTF-8'))
			
			buf = fisier.read(2048)
			while (buf):
				clientsocket.send(buf)
				buf = fisier.read(1024)
		except IOError:
			msg = 'Eroare! Resursa ceruta ' + numeResursaCeruta + ' nu a putut fi gasita!'
			print(msg)
			clientsocket.sendall(bytes('HTTP/1.1 404 Not Found\r\n', 'UTF-8'))
			clientsocket.sendall(bytes('Content-Length: ' + str(len(msg.encode('utf-8'))) + '\r\n', 'UTF-8'))
			clientsocket.sendall(bytes('Content-Type: text/plain; charset=utf-8\r\n', 'UTF-8'))
			clientsocket.sendall(bytes('Server: My PW Server\r\n', 'UTF-8'))
			clientsocket.sendall(bytes('\r\n', 'UTF-8'))
			clientsocket.sendall(bytes(msg, 'UTF-8'))

		finally:
			if fisier is not None:
				fisier.close()
		clientsocket.close()
		print('S-a terminat comunicarea cu clientul.')

