using System;
using System.Collections.Generic;
using DIO.Series.Interfaces;

namespace DIO.Series
{
	public class SerieRepository : IRepository<Serie>
	{
        private List<Serie> listSerie = new List<Serie>();
		public void Updates(int id, Serie objeto)
		{
			listSerie[id] = objeto;
		}

		public void excludes(int id)
		{
			listaSerie[id].excludes();
		}

		public void insert(Serie objeto)
		{
			listaSerie.Add(objeto);
		}

		public List<Serie> List()
		{
			return listSerie;
		}

		public int NextId()
		{
			return listSerie.Count;
		}

		public Serie ReturnById(int id)
		{
			return listSerie[id];
		}
	}
}