import java.io.*
import java.net.ServerSocket
import java.util.*

//metoda main zawiera cały program serwera
//po uruchomieni odpal na adresie localhost:5000
//sprawdzaj komunikaty w IJ


fun main() {
    //zmienne
    val PORT = 5000
    val newLine = "\r\n"
    try {
        val serverSocket = ServerSocket(PORT) // obiekt servera
        println("serwer startuje na porcie $PORT")
        while (true) {
            val client = serverSocket.accept() //  cały czas nasłuch na połączenie klienta (listen)
            try {
                // odbiór danych z kienta operuje na klasach BufferedReader, BufferedOutputStream
                // podobnie jak w lekcji z plikacmi

                val input = BufferedReader(InputStreamReader(client.getInputStream()))
                val out = BufferedOutputStream(client.getOutputStream())
                val pout = PrintStream(out)

                // czytamy dane żądania

                val request = input.readLine()
                println("pierwsza linia żądania: $request")

                // wysyłamy testową odpowiedź do klienta

                val response = "response"

                // tworzymy ręcznie cały nagłówek http, który będzie
                // widoczny w konsoli przeglądarki

                pout.print(
                    "HTTP/1.1 200 OK" + newLine +
                            "Content-Type: text/html; charset=UTF-8" + newLine +
                            "Date: " + Date() + newLine +
                            "Content-length: " + response.length + newLine + newLine +
                            response
                )
                pout.close()
            } catch (e: Throwable) {
                println("problem z odebraniem danych na serwerze $e")
            }
        }
    } catch (e: Throwable) {
        println("problem z uruchomieniem serwera $e")
    }
}