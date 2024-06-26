package com.booksystem.booksystemapp.repository

import android.util.Log
import com.booksystem.booksystemapp.model.PerfilUsuario
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import okhttp3.Call
import okhttp3.Callback
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import okhttp3.Response
import java.io.IOException


class PerfilUsuarioRepository {
    var logtag: String = "PerfilUsuarioRepository"

    private var localhost: String = "localhost"
    val okhttp = OkHttpClient()
    val gson = Gson()

    fun savePerfil(perfilUsuario: PerfilUsuario) {

        val json = gson.toJson(perfilUsuario)

        val body = json.toRequestBody("application/json".toMediaTypeOrNull())

        val req = Request.Builder()
            .post(body)
            .url("http://${localhost}/booksystem/api/perfil")
            .build()

        val res = object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                Log.e(logtag, "call $call | Exception: ${e.localizedMessage}")

            }

            override fun onResponse(call: Call, response: Response) {
                val resposta = response.body?.string().toString()
                Log.i(logtag, "call $call | \n Resposta: ${resposta}")
            }

        }

        okhttp.newCall(req).enqueue(res)

    }

    fun getPefil(
        username: String?,
        sucess: (Response, PerfilUsuario) -> Unit,
        fail: (IOException) -> Unit
    ) {

        val req = Request.Builder()
            .get()
            .url("http://${localhost}/booksystem/api/perfil?username=${username}")
            .build()

        val res = object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                Log.e(logtag, "call $call | Exception: ${e.localizedMessage}")
                fail(e)
            }

            override fun onResponse(call: Call, response: Response) {
                val resposta = response.body?.string().toString()
                Log.i(logtag, "call $call | \n Resposta: ${resposta}")

                if (resposta != "") {
                    val type = object : TypeToken<PerfilUsuario>() {}.type
                    val perfil = gson.fromJson<PerfilUsuario>(resposta, type)
                    sucess(response, perfil)
                }

            }

        }

        okhttp.newCall(req).enqueue(res)
    }
}